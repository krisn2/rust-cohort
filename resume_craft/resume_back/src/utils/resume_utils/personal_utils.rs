use crate::models::profile::Personal;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn personal_utils(personal_info: &Personal) -> String {
    let mut tex = String::new();

    // Start center block
    tex.push_str("\\begin{center}\n");

    // Full name
    tex.push_str(&format!(
        "\\textbf{{\\Huge \\scshape {}}} \\\\\n",
        latex_escape(personal_info.fullname.as_str())
    ));

    // Spacer
    tex.push_str("\\vspace{1pt}\n\\small ");

    let mut details = Vec::new();

    // Number
    if !personal_info.number.trim().is_empty() {
        details.push(latex_escape(personal_info.number.as_str()));
    }

    // Email
    if !personal_info.email.trim().is_empty() {
        let escaped_email = latex_escape(personal_info.email.as_str());
        details.push(format!(
            "\\href{{mailto:{0}}}{{\\underline{{{0}}}}}",
            escaped_email
        ));
    }

    // Website - now with portfolio name support
    if let Some(url) = personal_info.web_url.as_deref() {
        if !url.trim().is_empty() {
            let escaped_url = latex_escape(url);
            let display_name = latex_escape("Portfolio"); // or any name you prefer
            details.push(format!(
                "\\href{{{}}}{{\\underline{{{}}}}}",
                escaped_url, display_name
            ));
        }
    }

    // LinkedIn
    if let Some(url) = personal_info.linkedin_url.as_deref() {
        if !url.trim().is_empty() {
            let name = latex_escape(
                personal_info
                    .linkedin_name
                    .as_deref()
                    .unwrap_or(url)
            );
            details.push(format!(
                "\\href{{{}}}{{\\underline{{{}}}}}",
                latex_escape(url),
                name
            ));
        }
    }

    // GitHub
    if let Some(url) = personal_info.github_url.as_deref() {
        if !url.trim().is_empty() {
            let name = latex_escape(
                personal_info
                    .github_name
                    .as_deref()
                    .unwrap_or(url)
            );
            details.push(format!(
                "\\href{{{}}}{{\\underline{{{}}}}}",
                latex_escape(url),
                name
            ));
        }
    }

    // Address
    if let Some(addr) = personal_info.address.as_deref() {
        if !addr.trim().is_empty() {
            details.push(latex_escape(addr));
        }
    }

    // Join details with $|$ separator
    tex.push_str(&details.join(" $|$ "));

    // End center block
    tex.push_str("\n\\end{center}\n");

    tex
}