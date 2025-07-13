mod models;
mod handlers;

use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use models::resume::ResumeRequest;
use handlers::resume_handler::resume_tex;

async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
    let resume = data.into_inner();
    let tex_content = resume_tex(&resume);
    
    HttpResponse::Ok()
        .content_type("text/plain")
        .body(tex_content)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/resume", web::post().to(handle_resume))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
