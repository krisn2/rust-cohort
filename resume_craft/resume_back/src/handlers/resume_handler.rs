use tempfile::tempdir;
use std::fs::{self, File};
use std::io::Write;
use async_process::Command;


/// Convert LaTeX string to PDF bytes (in memory, per-request).
pub async fn generate_pdf_from_latex(latex_code: &str) -> Result<Vec<u8>, String> {
    let dir = tempdir().map_err(|e| e.to_string())?;
    let tex_path = dir.path().join("resume.tex");

    // Write LaTeX to file
    let mut tex_file = File::create(&tex_path).map_err(|e| e.to_string())?;
    tex_file
        .write_all(latex_code.as_bytes())
        .map_err(|e| e.to_string())?;

    // Run pdflatex
    let output = Command::new("pdflatex")
        .arg("-interaction=nonstopmode")
        .arg("resume.tex")
        .current_dir(dir.path())
        .output()
        .await
        .map_err(|e| format!("pdflatex execution error: {e}"))?;

    if !output.status.success() {
        return Err(format!(
            "LaTeX compilation failed:\n{}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    // Read the resulting PDF
    let pdf_path = dir.path().join("resume.pdf");
    let pdf_bytes = fs::read(pdf_path).map_err(|e| e.to_string())?;

    // `dir` is auto-deleted here when it goes out of scope
    Ok(pdf_bytes)
}
