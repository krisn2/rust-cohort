use actix_web::{web, App, HttpServer};
use std::env;

mod routes;
mod models;
mod jwt;
mod middleware;
use routes::{course_route, user_route, admin_route};
use middleware::auth::AuthMiddleware;



#[actix_web::main]
async fn main () -> Result<(),Box<dyn std::error::Error> > {

    let jwt_user_secret = env::var("JWT_USER_SECRET")?;
    let jwt_admin_secret = env::var("JWT_ADMIN_SECRET")?;

    let mongo_client = mongodb::Client::with_uri_str("mongodb://localhost:27017").await?;
    HttpServer::new(move ||{
        App::new()

            .app_data(web::Data::new(mongo_client.clone()))
            .service(
                web::scope("/user")
                .route("/login", web::post().to(user_route::login))
                .route("/register", web::post().to(user_route::register))
            )
            .service(
                web::scope("/course")
                .route("/preview", web::get().to(course_route::preview))
                .wrap(AuthMiddleware {secret: jwt_user_secret.clone()})
                .route("/purchase", web::post().to(course_route::purchase))
            )
            .service(
                web::scope("/admin")
                .route("/login", web::post().to(admin_route::admin_login))
                .route("/register", web::post().to(admin_route::admin_register))
                .service(
                    web::scope("/course")
                    .wrap(AuthMiddleware {secret: jwt_admin_secret.clone()})
                    .route("/create", web::post().to(admin_route::create_course))
                    .route("/update/{id}", web::put().to(admin_route::update_course))
                )
            )
    })
    .bind("127.0.0.1:7000")?
    .run()
    .await
    .map_err(|err| Box::new(err) as Box<dyn std::error::Error>)
}