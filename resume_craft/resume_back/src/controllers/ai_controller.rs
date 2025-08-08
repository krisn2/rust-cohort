use actix_multipart::Multipart;
use actix_web::{HttpResponse, Responder};
use futures_util::StreamExt;
use sanitize_filename::sanitize;
use std::{fs::File, io::Write};

use crate::utils::ai::{send_to_gemini, extract_projects_from_ai_response};
use crate::utils::pdf::extract_text_from_pdf;
use crate::utils::resume_parser::extract_projects_from_resume;

pub async fn improve_projects_ai(mut payload: Multipart) -> impl Responder {
    let mut resume_path: Option<String> = None;
    let mut jd_text: Option<String> = None;

    while let Some(field_result) = payload.next().await {
        let mut field = match field_result {
            Ok(f) => f,
            Err(_) => return HttpResponse::BadRequest().body("Error reading multipart field"),
        };

        let name = field.name().to_string();

        std::fs::create_dir_all("./tmp").expect("Failed to create tmp directory");

        // Handle resume PDF upload
        if name == "resume" {
            let content_disposition = field.content_disposition();
            let filename = content_disposition
                .get_filename()
                .map(|s| s.to_string())
                .unwrap_or_else(|| "resume.pdf".to_string());

            let filename = sanitize(filename);
            let filepath = format!("./tmp/{}", filename);
            let mut file = match File::create(&filepath) {
                Ok(f) => f,
                Err(_) => {
                    return HttpResponse::InternalServerError().body("Failed to save resume file");
                }
            };

            while let Some(chunk) = field.next().await {
                let data = match chunk {
                    Ok(d) => d,
                    Err(_) => {
                        return HttpResponse::InternalServerError()
                            .body("Error reading resume file");
                    }
                };
                if let Err(_) = file.write_all(&data) {
                    return HttpResponse::InternalServerError().body("Resume file write error");
                }
            }

            resume_path = Some(filepath);
        }

        // Handle job_description as plain text
        if name == "job_description" {
            let mut job_desc = String::new();
            while let Some(chunk) = field.next().await {
                let data = match chunk {
                    Ok(d) => d,
                    Err(_) => {
                        return HttpResponse::InternalServerError()
                            .body("Error reading job description");
                    }
                };
                job_desc.push_str(std::str::from_utf8(&data).unwrap_or(""));
            }
            jd_text = Some(job_desc);
        }
    }

    // Extract text from resume PDF
    let resume_text = match resume_path {
        Some(ref path) => extract_text_from_pdf(path).unwrap_or("".into()),
        None => return HttpResponse::BadRequest().body("Resume not provided"),
    };

    // Job description must be provided as text
    let jd_text = match jd_text {
        Some(text) => text,
        None => return HttpResponse::BadRequest().body("Job description not provided"),
    };

    let parsed_projects = extract_projects_from_resume(&resume_text);

   let prompt = format!(
    "Job Description:\n{}\n\nProjects:\n{}\n\nRewrite each project description to align with the job description. Expand on technical details, emphasize backend architecture, performance improvements, and impact. Respond with only the rewritten project descriptions, one per paragraph, no headings or explanation.",
    jd_text,
    parsed_projects.join("\n\n")
);


    // println!("Resume Text:\n{}", resume_text);
    // println!("Parsed Projects:\n{:?}", parsed_projects);
    // println!("Job Description:\n{}", jd_text);

    match send_to_gemini(prompt).await {
    Ok(ai_response) => {
        let projects_json = extract_projects_from_ai_response(&ai_response);
        HttpResponse::Ok().json(projects_json)
    }
    Err(e) => HttpResponse::InternalServerError().body(format!("Gemini error: {}", e)),
}

}
