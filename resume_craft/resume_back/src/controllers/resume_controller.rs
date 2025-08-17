use actix_web::{web, Responder, HttpResponse};
use serde_json::json;
use crate::utils::resume_utils::resume_utils::resume_utils_fn;
use crate::models::resume::ResumeRequest;
use reqwest::Client;

//Old handler 

// pub async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
//     let resume = data.into_inner();
//     // println!("{:?}",resume);
//     let tex_code = resume_utils_fn(&resume);

//     match generate_pdf_from_latex(&tex_code).await {
//         Ok(pdf_bytes) => HttpResponse::Ok()
//             .insert_header(("Content-Type", "application/pdf"))
//             .insert_header(("Content-Disposition", "attachment; filename=\"resume.pdf\""))
//             .body(pdf_bytes),
//         Err(err) => HttpResponse::InternalServerError().body(format!("PDF generation error: {err}")),
//     }
// }

pub async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
    let resume = data.into_inner();
    let tex_code = resume_utils_fn(&resume);
    // println!("{:?}",tex_code);

    // Prepare the payload for the external microservice
    let payload = json!({
        "source": tex_code,
        "filename": "resume.pdf"
    });

    // Get the microservice URL from environment variables
    let microservice_url = std::env::var("PDF_MICROSERVICE_URL")
        .unwrap_or_else(|_| "http://localhost:8080/compile".to_string());

    let client = Client::new();

    match client.post(&microservice_url).json(&payload).send().await {
        Ok(response) => {
            if response.status().is_success() {
                let pdf_bytes = response.bytes().await.map_err(|e| e.to_string()).unwrap();
                HttpResponse::Ok()
                    .insert_header(("Content-Type", "application/pdf"))
                    .insert_header(("Content-Disposition", "attachment; filename=\"resume.pdf\""))
                    .body(pdf_bytes)
            } else {
                let status = response.status();
                let text = response.text().await.unwrap_or_else(|_| "Unknown error".to_string());
                HttpResponse::InternalServerError().body(format!("PDF generation microservice returned an error: {} - {}", status, text))
            }
        }
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Failed to connect to PDF generation microservice: {err}"))
        }
    }
}