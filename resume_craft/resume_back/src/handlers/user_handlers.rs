use actix_web::{web, HttpResponse, Responder};
use mongodb::{Client, bson::doc};
use crate::models::users::{User, LoginRequest};
use crate::utils::jwt::create_jwt;

use argon2::{Argon2, PasswordHash, PasswordVerifier,PasswordHasher};
use password_hash::{SaltString, rand_core::OsRng};

pub async fn register(
    client: web::Data<Client>,
    user: web::Json<User>,
) -> impl Responder {

    let data = user.into_inner();
    let collection = client.database("resume_db").collection::<User>("users");

    if data.email.is_empty() || data.name.is_empty() || data.password.is_empty() {
        return HttpResponse::Ok().body("fill the required fields");
    }

    if let Ok(Some(_)) = collection.find_one(doc! {"email": &data.email}).await {
        return HttpResponse::BadRequest().body("User already exists");
    }
    

    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();

    // Hash password
    let hashed_password = match argon2.hash_password(data.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => return HttpResponse::InternalServerError().body("Failed to hash password"),
    };

    let user = User {
        password: hashed_password,
        ..data.into()

    };

    match collection.insert_one(user).await {
        Ok(_) => HttpResponse::Created().body("User registered"),
        Err(err) => HttpResponse::InternalServerError().body(format!("Mongo insert error: {err}")),
    }
}

pub async fn login(
    client: web::Data<Client>,
    creds: web::Json<LoginRequest>,
) -> impl Responder {
    let collection = client.database("resume_db").collection::<User>("users");

    let login_data = creds.into_inner();

    if login_data.email.is_empty() || login_data.password.is_empty() {
        return HttpResponse::BadRequest().body("Fill the all fields");
    }

    let user = collection
        .find_one(doc! { "email": &login_data.email })
        .await
        .unwrap_or(None);

    if let Some(user) = user {
        let parsed_hash = PasswordHash::new(&user.password).unwrap();

        if Argon2::default().verify_password(login_data.password.as_bytes(), &parsed_hash).is_ok() {
            let token = create_jwt(user.id.unwrap().to_string());
            return HttpResponse::Ok().json(serde_json::json!({ "token": token }));
        }
    }

    HttpResponse::Unauthorized().body("Invalid email or password")
}

