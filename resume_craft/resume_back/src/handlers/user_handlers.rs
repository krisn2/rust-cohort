use actix_web::{web,Responder};
use mongodb::{Client};
use crate::models::users::User;

async fn add_user(
    client: web::Data<Client>,
    user: web::Json<User>,
) -> impl Responder {
    let collection = client.database(DB_NAME).collection(COLLECTION_NAME);
    let new_user = User::from_json(user.into_inner());

    match collection.insert_one(new_user, None).await {
        Ok(_) => HttpResponse::Created().finish(),
        Err(err) => {
            eprintln!("Failed to add user: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
