use actix_web::{Responder, HttpResponse,web};
use mongodb::Client;
use crate::models::course_model::PurchaseCourse;


pub async fn purchase(purchase:web::Json<PurchaseCourse>, db:web::Data<Client>, id:web::Path<String>)-> impl Responder {
    if id.is_empty() {
        return HttpResponse::Ok().body("Send the User Id");
    }

    let purchase_data = purchase.into_inner();

    let collection = db.database("course_selling").collection::<PurchaseCourse>("purchases");

    match collection.insert_one(purchase_data).await {
        Ok(sucess) => {
            return HttpResponse::Ok().body(format!("Course purchase SucessFull {}",sucess.inserted_id))
        }
        Err(_) => {
            return HttpResponse::InternalServerError().body("Failed to Purchase course");
        }
    }
}

pub async fn preview() -> impl Responder {
    HttpResponse::Ok().body("courses preview")
}