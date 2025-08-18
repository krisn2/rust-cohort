mod controllers;
mod handlers;
mod middleware;
mod models;
mod utils;

use actix_cors::Cors;
use actix_web::{App, HttpServer, http, web};
use controllers::resume_controller::handle_resume;
use handlers::user_handlers::{login, register};
use middleware::auth::AuthMiddleware;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    let mongo_url = std::env::var("MONGO_URL")?;
    let origin = std::env::var("ORIGIN")?;
    let port = std::env::var("PORT").unwrap_or_else(|_| "2222".to_string()); // ✅ get PORT from env

    let client = mongodb::Client::with_uri_str(&mongo_url).await?;

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(origin.as_str())
            // .allowed_origin("http://localhost:5173") // ✅ allow localhost for development
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(client.clone()))
            .service(web::resource("/register").route(web::post().to(register)))
            .service(web::resource("/login").route(web::post().to(login)))
            .service(
                web::resource("/resume")
                    .wrap(AuthMiddleware)
                    .route(web::post().to(handle_resume)),
            )
    })
    .bind(format!("0.0.0.0:{}", port))? // ✅ listen on all interfaces
    .run()
    .await
    .map_err(|e| Box::new(e) as Box<dyn std::error::Error>)
}

