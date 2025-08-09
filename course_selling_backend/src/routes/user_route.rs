use actix_web::{Responder, HttpResponse};

pub async fn login()-> impl Responder {
    HttpResponse::Ok().body("your Login")
}

pub async fn register() -> impl Responder {
    HttpResponse::Ok().body("Your Register")
}