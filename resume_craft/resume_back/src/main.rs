mod models;
mod handlers;
mod utils;
mod middleware; 

use actix_web::{web, App, HttpServer};
use handlers::resume_handler::handle_resume;
use handlers::user_handlers::{register, login};
use middleware::auth::AuthMiddleware; 
use actix_cors::Cors;

#[actix_web::main]
async fn main() ->  Result<(), Box<dyn std::error::Error>> {

    let client = mongodb::Client::with_uri_str("mongodb://localhost:27017").await?;

    HttpServer::new(move || {
        // let cors = Cors::default().allow_any_header().allow_any_method().allow_any_origin();
        let cors = Cors::default()
            .allow_any_origin()
            // .allowed_origin("http://localhost:5173/")
            .allow_any_header()
            .allow_any_method()
            // .allowed_methods(vec!["POST", "GET"])
            // .allowed_headers(vec!["Content-Type"])
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
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
    .map_err(|e| Box::new(e) as Box<dyn std::error::Error>)
}
