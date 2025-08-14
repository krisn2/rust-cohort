
use actix_web::{web, HttpResponse, Responder};
use mongodb::{bson::doc, Client};
use std::env;

fn get_jwt_user_secret() -> String {
    env::var("JWT_USER_SECRET").unwrap_or_else(|_| "human_being".to_string())
}

use crate::{jwt::create_jwt, models::user_model::{LoginUser, Users}};

pub async fn register(user_data:web::Json<Users>, db_client:web::Data<Client>)-> impl Responder {
    let user = user_data.into_inner();
    if user.firstname.is_empty() || user.lastname.is_empty() || user.email.is_empty() || user.password.is_empty() {
        return HttpResponse::BadRequest().body("Fill the required fields");
    }
    let collection = db_client.database("course_selling").collection::<Users>("users");

    let user_exists = collection.find_one(doc! {"email": &user.email}).await.unwrap_or(None);

    if user_exists.is_some() {
        return HttpResponse::BadRequest().body("User already exists");
    }

    match collection.insert_one(user).await {
        Ok(m) => {
            HttpResponse::Ok().body(format!("user is Register: {:?}",m.inserted_id))
        }
        Err(er) => {
            HttpResponse::Ok().body(format!("Mongo insert Error {er}"))
        }
    }
    
}

pub async fn login(db_client:web::Data<Client>, cred: web::Json<LoginUser>) -> impl Responder {

    let col = db_client.database("course_selling").collection::<Users>("users") ;
    // HttpResponse::Ok().body("Your Register")
    let user = col.find_one(doc! {"email":&cred.email}).await.unwrap_or(None);

    if let Some(user) = user {
        if user.password == cred.password {
            let token = create_jwt(user.id.unwrap().to_string(), &get_jwt_user_secret());
            return HttpResponse::Ok().body(token);
        } else {
            return HttpResponse::Unauthorized().body("Invalid password");
        }
    } else {
        return HttpResponse::NotFound().body("User not found");
    }

}