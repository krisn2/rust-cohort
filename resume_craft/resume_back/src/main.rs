mod models;
mod handlers;

use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use models::resume::ResumeRequest;
use handlers::resume_handler::{resume_tex, generate_pdf_from_latex};

async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
    let resume = data.into_inner();
    let tex_code = resume_tex(&resume);

    match generate_pdf_from_latex(&tex_code).await {
        Ok(pdf_bytes) => HttpResponse::Ok()
            .insert_header(("Content-Type", "application/pdf"))
            .insert_header(("Content-Disposition", "attachment; filename=\"resume.pdf\""))
            .body(pdf_bytes),
        Err(err) => HttpResponse::InternalServerError().body(format!("PDF generation error: {err}")),
    }
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
