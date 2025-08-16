use actix_web::{
    http::header::{ContentDisposition, DispositionParam, DispositionType},
    middleware::Logger,
    web, App, HttpResponse, HttpServer, Responder,
};
use serde::Deserialize;
use std::{fs, time::Duration};
use tempfile::tempdir;
use tokio::{process::Command, time::timeout};

#[derive(Debug, Deserialize)]
struct CompileRequest {
    source: String,
    filename: Option<String>,
}

async fn health() -> impl Responder {
    "ok"
}

async fn compile_pdf(payload: web::Json<CompileRequest>) -> actix_web::Result<HttpResponse> {
    match compile_with_tectonic(&payload.source, payload.filename.clone()).await {
        Ok((pdf_bytes, filename)) => {
            let cd = ContentDisposition {
                disposition: DispositionType::Attachment,
                parameters: vec![DispositionParam::Filename(filename)],
            };
            Ok(HttpResponse::Ok()
                .content_type("application/pdf")
                .insert_header(cd)
                .body(pdf_bytes))
        }
        Err(e) => {
            let msg = serde_json::json!({ "error": e });
            Ok(HttpResponse::BadRequest().json(msg))
        }
    }
}

fn preprocess_latex(source: &str) -> String {
    // Handle common LaTeX compatibility issues with Tectonic
    let mut processed = source.to_string();
    
    // Remove or replace problematic \input{glyphtounicode}
    processed = processed.replace("\\input{glyphtounicode}", "");
    
    // Fix common LaTeX issues
    // Ensure proper document structure
    if !processed.contains("\\end{document}") && processed.contains("\\begin{document}") {
        processed.push_str("\\end{document}");
    }
    
    // Replace problematic font commands that might not be available
    processed = processed.replace("\\usepackage[sfdefault]{FiraSans}", "% \\usepackage[sfdefault]{FiraSans}");
    processed = processed.replace("\\usepackage[sfdefault]{roboto}", "% \\usepackage[sfdefault]{roboto}");
    processed = processed.replace("\\usepackage[sfdefault]{noto-sans}", "% \\usepackage[sfdefault]{noto-sans}");
    processed = processed.replace("\\usepackage[default]{sourcesanspro}", "% \\usepackage[default]{sourcesanspro}");
    processed = processed.replace("\\usepackage{CormorantGaramond}", "% \\usepackage{CormorantGaramond}");
    processed = processed.replace("\\usepackage{charter}", "% \\usepackage{charter}");
    
    // Ensure we have required packages for the resume template
    if !processed.contains("\\usepackage{geometry}") && processed.contains("\\addtolength{\\oddsidemargin}") {
        // Add geometry package for margin adjustments
        let geometry_insert = "\\usepackage[letterpaper,margin=0.75in]{geometry}\n";
        if let Some(pos) = processed.find("\\usepackage{latexsym}") {
            processed.insert_str(pos, geometry_insert);
        }
    }
    
    processed
}

async fn compile_with_tectonic(
    source: &str,
    filename: Option<String>,
) -> Result<(Vec<u8>, String), String> {
    let out_name = filename.unwrap_or_else(|| "output".to_string());
    let dir = tempdir().map_err(|e| format!("failed to create tempdir: {e}"))?;
    let workdir = dir.path();

    // Preprocess the LaTeX source to handle compatibility issues
    let processed_source = preprocess_latex(source);
    
    println!("Working directory: {:?}", workdir);
    println!("Processed source length: {}", processed_source.len());

    // Write .tex file
    let main_tex = workdir.join("main.tex");
    fs::write(&main_tex, &processed_source).map_err(|e| format!("failed to write file: {e}"))?;

    // Verify the file was written correctly
    let written_content = fs::read_to_string(&main_tex).map_err(|e| format!("failed to verify written file: {e}"))?;
    if written_content != processed_source {
        return Err("File content mismatch after writing".to_string());
    }

    // Run tectonic with more permissive settings
    let mut cmd = Command::new("tectonic");
    cmd.arg("--keep-intermediates")
        .arg("--keep-logs")
        .arg("--print")  // Add print option for better debugging
        .arg("-o")
        .arg(workdir)
        .arg("--engine=pdftex") // Corrected: This line fixes the `\pdfgentounicode` error
        .arg(&main_tex)
        .env("HOME", "/home/appuser");

    println!("Running: {:?}", cmd);

    let run = timeout(Duration::from_secs(45), cmd.output())  // Increased timeout
        .await
        .map_err(|_| "latex compilation timed out".to_string())?
        .map_err(|e| format!("failed to run tectonic: {e}"))?;

    if !run.status.success() {
        let stderr = String::from_utf8_lossy(&run.stderr).to_string();
        let stdout = String::from_utf8_lossy(&run.stdout).to_string();
        
        // Try to read the log file for more details
        let log_content = if let Ok(log_files) = fs::read_dir(workdir) {
            log_files
                .filter_map(|entry| entry.ok())
                .find(|entry| entry.path().extension().map_or(false, |ext| ext == "log"))
                .and_then(|log_file| fs::read_to_string(log_file.path()).ok())
                .unwrap_or_else(|| "No log file found".to_string())
        } else {
            "Could not read working directory".to_string()
        };
        
        return Err(format!(
            "compilation failed:\nstdout: {}\nstderr: {}\nlog: {}",
            stdout, stderr, log_content
        ));
    }

    // Read compiled PDF
    let pdf_path = workdir.join("main.pdf");
    if !pdf_path.exists() {
        // List all files in the working directory for debugging
        let files = fs::read_dir(workdir)
            .map(|entries| {
                entries
                    .filter_map(|entry| entry.ok())
                    .map(|entry| entry.file_name().to_string_lossy().to_string())
                    .collect::<Vec<_>>()
                    .join(", ")
            })
            .unwrap_or_else(|_| "Could not list files".to_string());
        
        return Err(format!("PDF not generated. Files in working directory: {}", files));
    }
    
    let pdf_data = fs::read(&pdf_path).map_err(|e| format!("failed to read PDF output: {e}"))?;

    Ok((pdf_data, format!("{}.pdf", out_name)))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let host = std::env::var("HOST").unwrap_or_else(|_| "0.0.0.0".into());
    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(8080);

    println!("🚀 Starting server on {host}:{port}");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .app_data(web::JsonConfig::default().limit(2_000_000))
            .route("/health", web::get().to(health))
            .route("/compile", web::post().to(compile_pdf))
    })
    .bind((host.as_str(), port))?
    .run()
    .await
}