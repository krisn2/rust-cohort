use actix_web::{Responder, HttpResponse};

pub async fn admin_dashboard() -> impl Responder {
    HttpResponse::Ok().body("Welcome to the Admin Dashboard")
}

pub async fn create_course() -> impl Responder {
    HttpResponse::Ok().body("Course created successfully")
}

pub async fn update_course() -> impl Responder {
    HttpResponse::Ok().body("Course updated successfully")
}

pub async fn get_all_course() -> impl Responder {
    HttpResponse::Ok().body("List of all courses")
}

