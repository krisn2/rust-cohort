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
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();

    // Hash password
    let hashed_password = match argon2.hash_password(user.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => return HttpResponse::InternalServerError().body("Failed to hash password"),
    };

    let user = User {
        password: hashed_password,
        ..user.into_inner()
    };

    let collection = client.database("resume_db").collection::<User>("users");
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

    let user = collection
        .find_one(doc! { "email": &creds.email })
        .await
        .unwrap_or(None);

    if let Some(user) = user {
        let parsed_hash = PasswordHash::new(&user.password).unwrap();

        if Argon2::default().verify_password(creds.password.as_bytes(), &parsed_hash).is_ok() {
            let token = create_jwt(user.id.unwrap().to_string());
            return HttpResponse::Ok().json(serde_json::json!({ "token": token }));
        }
    }

    HttpResponse::Unauthorized().body("Invalid email or password")
}

