use reqwest::Client;
use serde_json::json;

pub async fn send_to_gemini(prompt: String) -> Result<String, Box<dyn std::error::Error>> {
    let api_key = std::env::var("GEMINI_API_KEY")?;
    let url = format!(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={}",
        api_key
    );

    let client = Client::new();

    let body = json!({
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    });

    let res = client
        .post(&url)
        .header("Content-Type", "application/json")
        .json(&body)
        .send()
        .await?;

    let json: serde_json::Value = res.json().await?;

    let text = json["candidates"][0]["content"]["parts"][0]["text"]
        .as_str()
        .unwrap_or("Gemini response missing")
        .to_string();

    Ok(text)
}

use serde::Serialize;

#[derive(Serialize)]
pub struct ProjectsJson {
    pub projects: Vec<String>,
}

pub fn extract_projects_from_ai_response(ai_response: &str) -> ProjectsJson {
    let projects: Vec<String> = ai_response
        .split("\n\n")
        .map(|p| p.trim().to_string())
        .filter(|p| !p.is_empty())
        .collect();

    ProjectsJson { projects }
}

