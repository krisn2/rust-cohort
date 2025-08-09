use actix_web::{Responder, HttpResponse};


pub async fn purchase()-> impl Responder {
    HttpResponse::Ok().body("Courses that you purchased..")
}

pub async fn preview() -> impl Responder {
    HttpResponse::Ok().body("courses preview")
}