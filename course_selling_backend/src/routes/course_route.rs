use actix_web::{web, HttpMessage, HttpRequest, HttpResponse, Responder};
use futures::StreamExt;
use mongodb::{Client, bson::doc};
use crate::{jwt::Claims, models::course_model::{Course, PurchaseCourse}};


pub async fn purchase(purchase:web::Json<PurchaseCourse>, db:web::Data<Client>, id:web::Path<String>)-> impl Responder {
    if id.is_empty() {
        return HttpResponse::Ok().body("Send the User Id");
    }

    let purchase_data = purchase.into_inner();

    let collection = db.database("course_selling").collection::<PurchaseCourse>("purchases");

    //should check that the user actually paid the price

    match collection.insert_one(purchase_data).await {
        Ok(sucess) => {
            return HttpResponse::Ok().body(format!("Course purchase SucessFull {}",sucess.inserted_id))
        }
        Err(_) => {
            return HttpResponse::InternalServerError().body("Failed to Purchase course");
        }
    }
}

pub async fn preview(db:web::Data<Client>) -> impl Responder {
    let col = db.database("course_selling").collection::<Course>("courses");
    let filter = doc! {};
    match col.find(filter).await {
        Ok(mut cursor) => {
            let mut courses = Vec::new();
            while let Some(course) = cursor.next().await {
                match course {
                    Ok(c) => courses.push(c),
                    Err(e) => return HttpResponse::InternalServerError().body(format!("Error fetching course: {:?}", e)),
                }
            }
            HttpResponse::Ok().json(courses)
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("Error fetching courses: {:?}", e)),
    }
}


pub async fn purchases(db:web::Data<Client>,req:HttpRequest) -> impl Responder {
    let claims = req.extensions().get::<Claims>().cloned();
    if claims.is_none() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }
    let user_id = claims.unwrap().sub.to_string();

    let collection = db.database("course_selling").collection::<Course>("courses");

    match collection.find(doc! { "user_id": user_id }).await {
        Ok(mut cursor) => {
            let mut purchases = Vec::new();
            while let Some(course) = cursor.next().await {
                match course {
                    Ok(c) => purchases.push(c),
                    Err(e) => return HttpResponse::InternalServerError().body(format!("Error fetching course: {:?}", e)),
                }
            }
            HttpResponse::Ok().json(purchases)
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("Error fetching courses: {:?}", e)),
    }
}