use actix_web::{web, Responder, HttpResponse};
use crate::utils::resume_utils::resume_utils::resume_utils_fn;
use crate::models::resume::ResumeRequest;
use crate::handlers::resume_handler::generate_pdf_from_latex;


pub async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
    let resume = data.into_inner();
    // println!("{:?}",resume);
    let tex_code = resume_utils_fn(&resume);

    match generate_pdf_from_latex(&tex_code).await {
        Ok(pdf_bytes) => HttpResponse::Ok()
            .insert_header(("Content-Type", "application/pdf"))
            .insert_header(("Content-Disposition", "attachment; filename=\"resume.pdf\""))
            .body(pdf_bytes),
        Err(err) => HttpResponse::InternalServerError().body(format!("PDF generation error: {err}")),
    }
}