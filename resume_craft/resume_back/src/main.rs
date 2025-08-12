mod controllers;
mod handlers;
mod middleware;
mod models;
mod utils;

use actix_cors::Cors;
use actix_web::{App, HttpServer, http, web};
use controllers::ai_controller::improve_projects_ai;
use controllers::resume_controller::handle_resume;
use handlers::user_handlers::{login, register};
use middleware::auth::AuthMiddleware;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenvy::dotenv().ok();
    let mongo_url = std::env::var("MONGO_URL")?;
    let origin = std::env::var("ORIGIN")?;
    let client = mongodb::Client::with_uri_str(&mongo_url).await?;

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin(origin.as_str())
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(client.clone()))
            .service(web::resource("/register").route(web::post().to(register)))
            .service(web::resource("/login").route(web::post().to(login)))
            // 🔒 Protected resume route (JWT auth)
            .service(
                web::resource("/resume")
                    .wrap(AuthMiddleware)
                    .route(web::post().to(handle_resume)),
            )
            .service(
                web::resource("/ai/improve-projects").wrap(AuthMiddleware).route(web::post().to(improve_projects_ai)),
            )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
    .map_err(|e| Box::new(e) as Box<dyn std::error::Error>)
}
