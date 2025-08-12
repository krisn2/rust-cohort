use crate::models::certifications::CertificationSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

fn esc_if_not_empty(value: &str) -> Option<String> {
    if value.trim().is_empty() {
        None
    } else {
        Some(latex_escape(value))
    }
}

pub fn certifications_utils(cert_schema: &CertificationSchema) -> String {
    if cert_schema.certifications.is_empty() {
        return String::new();
    }

    let mut tex = String::from("\\section{Certifications \\& Professional Development}\n  \\resumeSubHeadingListStart\n");

    for cert in &cert_schema.certifications {
        let title = latex_escape(&cert.title);
        let date = esc_if_not_empty(&cert.date).unwrap_or_default();
        let issuer = latex_escape(&cert.issuer);

        // Certificate link
        let cert_display = if let Some(url) = &cert.certificate_url {
            if !url.trim().is_empty() {
                format!(
                    "\\href{{{}}}{{\\underline{{Verify Certificate}}}}",
                    latex_escape(url)
                )
            } else {
                String::new()
            }
        } else {
            String::new()
        };

        // Main heading
        tex.push_str(&format!(
            "    \\resumeSubheading\n      {{{}}}{{{}}}\n      {{{}}}{{{}}}\n",
            title, date, issuer, cert_display
        ));

        // Details list
        if !cert.details.is_empty() {
            tex.push_str("      \\resumeItemListStart\n");
            for detail in &cert.details {
                if !detail.trim().is_empty() {
                    tex.push_str(&format!(
                        "        \\resumeItem{{{}}}\n",
                        latex_escape(detail)
                    ));
                }
            }
            tex.push_str("      \\resumeItemListEnd\n");
        }
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}
