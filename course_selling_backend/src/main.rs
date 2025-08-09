use actix_web::{web, App, HttpResponse, HttpServer, Responder};


async fn greeting()-> impl Responder{
    HttpResponse::Ok().body("Fuck You")
}

async fn login()-> impl Responder {
    HttpResponse::Ok().body("your Login")
}

async fn register() -> impl Responder {
    HttpResponse::Ok().body("Your Register")
}

async fn purchase()-> impl Responder {
    HttpResponse::Ok().body("Courses that you purchased..")
}


#[actix_web::main]
async fn main () -> std::io::Result<()> {
    HttpServer::new(||{
        App::new()
            .route("/greet", web::get().to(greeting))
            .service(
                web::scope("/user")
                .route("/login", web::post().to(login))
                .route("/register", web::post().to(register))
                .route("/purchase", web::get().to(purchase))
            )
    })
    .bind("127.0.0.1:7000")?
    .run()
    .await
}