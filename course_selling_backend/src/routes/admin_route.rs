use actix_web::{ web, HttpMessage, HttpRequest, HttpResponse, Responder};
use crate::{jwt::{create_jwt, Claims}, models::{admin_model::{Admin, Loginadmin}, course_model::{Course, CourseUpdate}}};
use mongodb::{bson::{doc, self}, Client};
use std::env;


fn get_jwt_admin_secret() -> String {
    env::var("JWT_ADMIN_SECRET").unwrap_or_else(|_| "admin_being".to_string())
}

pub async fn admin_login(data: web::Json<Loginadmin>, db: web::Data<Client>) -> impl Responder {
    
    let admin_data = data.into_inner();
    let collection = db.database("course_selling").collection::<Admin>("admins");

    if let Some(admin) = collection.find_one(doc! {"email": admin_data.email}).await.unwrap_or(None) {
        if admin.password == admin_data.password {
            let token = create_jwt(admin.id.unwrap().to_string(), &get_jwt_admin_secret());
            return HttpResponse::Ok().json(token);
        }else {
            return HttpResponse::Unauthorized().body("Invalid password");
        }
    }else {
        return HttpResponse::Unauthorized().body("Admin not found");
    }
}

pub async fn admin_register(data : web::Json<Admin>, db: web::Data<Client>) -> impl Responder {
    let admin_data = data.into_inner(); // make mut foe hashing
    if admin_data.firstname.is_ascii() || admin_data.lastname.is_empty() || admin_data.email.is_empty() || admin_data.password.is_empty() {
        return HttpResponse::BadRequest().body("Fill the required fields");
    }
    let collection = db.database("course_selling").collection::<Admin>("admins");

    let admin_exists = collection.find_one(doc! {"email": &admin_data.email}).await.unwrap_or(None);

    if admin_exists.is_some() {
        return HttpResponse::BadRequest().body("Admin already exists");
    }

    match collection.insert_one(admin_data).await {
        Ok(success) => {
            HttpResponse::Ok().body(format!("Admin registered successfully: {:?}", success.inserted_id))
        }
        Err(e) => {
            HttpResponse::InternalServerError().body(format!("Failed to register admin: {:?}", e))
        }
    }
}


pub async fn create_course(data :web::Json<Course>, db: web::Data<Client>) -> impl Responder {
    let course = data.into_inner();
    if course.title.is_empty() || course.description.is_empty() || course.price <= 0.0 || course.img_url.is_empty() {
        return HttpResponse::BadRequest().body("fill the course data");
    }

    let collection = db.database("course_selling").collection::<Course>("courses");

    match collection.insert_one(course).await {
        Ok(result) => {
            HttpResponse::Ok().body(format!("Course created successfully: {:?}", result))
        }
        Err(e) => {
            HttpResponse::InternalServerError().body(format!("Failed to create course: {:?}", e))
        }
    }
}

pub async fn update_course(data : web::Json<CourseUpdate>, id: web::Path<String>, db: web::Data<Client>, req: HttpRequest) -> impl Responder {

    let claims = req.extensions().get::<Claims>().cloned();
    if claims.is_none() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }
    let admin_id = claims.unwrap().sub.to_string();

    let course_data = data.into_inner();
    let collection = db.database("course_selling").collection::<Course>("courses");

    let course_found = collection.find_one(doc! {"_id": id.into_inner(), "creator_id": admin_id}).await.unwrap_or(None);

    if course_found.is_none() {
        return HttpResponse::NotFound().body("Course not found or you are not the creator");
    }

    let update_doc = match bson::to_document(&course_data) {
        Ok(doc) => doc,
        Err(e) => return HttpResponse::InternalServerError().body(format!("Failed to serialize update: {:?}", e)),
    };

    match collection.update_one(doc! {"_id": course_found.unwrap().id}, update_doc).await {
        Ok(result) => {
            HttpResponse::Ok().body(format!("Course updated successfully: {:?}", result))
        }
        Err(e) => {
            HttpResponse::InternalServerError().body(format!("Failed to update course: {:?}", e))
        }
    }

}
