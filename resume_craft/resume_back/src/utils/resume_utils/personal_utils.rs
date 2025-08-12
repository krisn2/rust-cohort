use crate::models::profile::Personal;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn personal_utils(personal_info: &Personal) -> String {
    let mut web_site :&str = " ";
    let web_url = personal_info.web_url.as_deref().unwrap_or("");

    if web_url.is_empty() {
        web_site = " ";
    }

    format!(
        r#"
\begin{{center}}
\textbf{{\Huge \scshape {fullname}}} \\
\vspace{{1pt}}
\small {number} $|$ \href{{mailto:{email}}}{{\underline{{{email}}}}} $|$
\href{{{web_url}}}{{\underline{{{web_site}}}}} $|$
\href{{{linkedin_url}}}{{\underline{{{linkedin_name}}}}} $|$
\href{{{github_url}}}{{\underline{{{github_name}}}}}
\end{{center}}
"#,
        fullname = latex_escape(personal_info.fullname.as_str()),
        number = latex_escape(personal_info.number.as_str()),
        email = latex_escape(personal_info.email.as_str()),
        web_url = latex_escape(personal_info.web_url.as_deref().unwrap_or("")),
        linkedin_url = latex_escape(personal_info.linkedin_url.as_deref().unwrap_or("")),
        linkedin_name = latex_escape(personal_info.linkedin_name.as_deref().unwrap_or("")),
        github_url = latex_escape(personal_info.github_url.as_deref().unwrap_or("")),
        github_name = latex_escape(personal_info.github_name.as_deref().unwrap_or("")),
    )
}