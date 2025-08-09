use actix_web::{web, App, HttpServer};

mod routes;
mod models;
use routes::{course_route, user_route};

#[actix_web::main]
async fn main () -> std::io::Result<()> {
    HttpServer::new(||{
        App::new()
            // .route("/greet", web::get().to(greeting))
            .service(
                web::scope("/user")
                .route("/login", web::post().to(user_route::login))
                .route("/register", web::post().to(user_route::register))
            )
            .service(
                web::scope("/course")
                .route("/purchase", web::post().to(course_route::purchase))
                .route("/preview", web::get().to(course_route::preview))
            )
    })
    .bind("127.0.0.1:7000")?
    .run()
    .await
}