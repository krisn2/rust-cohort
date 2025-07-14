
use crate::models::{
    projects::ProjectSchema,
    education::EducationSchema,
    experience::ExperienceSchema,
    skills::SkillSchema,
    profile::Personal,
    resume::ResumeRequest,
};


use tempfile::tempdir;
use std::fs::{self, File};
use std::io::Write;
use async_process::Command;

use actix_web::{web, Responder, HttpResponse};


fn latex_escape(input: &str) -> String {
    input.replace("&", "\\&")
         .replace("%", "\\%")
         .replace("_", "\\_")
         .replace("#", "\\#")
         .replace("$", "\\$")
         .replace("{", "\\{")
         .replace("}", "\\}")
}

fn skills_info(skills:&SkillSchema)->String {
    if skills.categories.is_empty() {
        return String::new();
    }

    let mut tex = String::from("\\section{Skills}\n\\begin{itemize}[leftmargin=0.15in, label={}]\n");
    tex.push_str("    \\small{\\item{\n");

    for categoty in &skills.categories {
        tex.push_str(&format!(
            "   \\textbf{{{}}}{{: {}}} \\\\\n",
            latex_escape(&categoty.category_name),
            latex_escape(&categoty.items.join(", "))
        ));
    }

    tex.push_str("  }}\n\\end{itemize}\n");

    tex
}


fn project_info(project_schema: &ProjectSchema) -> String {
    let mut tex = String::new();
    tex.push_str("\\section{Projects}\n  \\resumeSubHeadingListStart\n");

    for project in &project_schema.projects {
        tex.push_str(&format!(
            "    \\resumeProjectHeading\n"
        ));
        tex.push_str(&format!(
            "        {{\\textbf{{{}}} $|$ \\emph{{{}}}}}{{{} -- {}}}\n",
            latex_escape(project.name.as_str()),
            latex_escape(project.tech_stack.clone().unwrap_or_default().as_str()),
            latex_escape(project.start_date.as_str()),
            latex_escape(project.end_date.as_str()),
        ));
        tex.push_str("        \\resumeItemListStart\n");

        for item in &project.project_des.lines {
            tex.push_str(&format!("          \\resumeItem{{{}}}\n", latex_escape(item.as_str())));
        }

        tex.push_str("        \\resumeItemListEnd\n");
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}

fn experience_info(experience_schema: &ExperienceSchema) -> String {
    let mut tex = String::new();
    tex.push_str("\\section{Experience}\n  \\resumeSubHeadingListStart\n");

    for exp in &experience_schema.experiences {
        tex.push_str(&format!(
            "    \\resumeSubheading\n      {{{}}}{{{} -- {}}}\n      {{{}}}{{{}}}\n",
            latex_escape(exp.position.as_str()),
            latex_escape(exp.start_date.as_str()),
            latex_escape(exp.end_date.as_str()),
            latex_escape(exp.company_name.as_str()),
            latex_escape(exp.address.as_str())
        ));

        tex.push_str("      \\resumeItemListStart\n");
        for line in &exp.job_des.lines {
            tex.push_str(&format!("        \\resumeItem{{{}}}\n", latex_escape(line)));
        }
        tex.push_str("      \\resumeItemListEnd\n");
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}

fn education_info(education_schema: &EducationSchema) -> String {
    let mut tex = String::new();
    tex.push_str("\\section{Education}\n  \\resumeSubHeadingListStart\n");

    for edu in &education_schema.educations {
        tex.push_str(&format!(
            "    \\resumeSubheading\n      {{{}}}{{{}}}\n      {{{}}}{{{} -- {}}}\n",
            latex_escape(edu.school.as_str()),
            latex_escape(edu.address.as_str()),
            latex_escape(edu.degree.as_str()),
            latex_escape(edu.start_date.as_str()),
            latex_escape(edu.end_date.as_str())
        ));
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}

fn personal_info(personal_info: &Personal) -> String {
    format!(
        r#"
\begin{{center}}
\textbf{{\Huge \scshape {fullname}}} \\
\vspace{{1pt}}
\small {number} $|$ \href{{mailto:{email}}}{{\underline{{{email}}}}} $|$
\href{{{web_url}}}{{\underline{{Website}}}} $|$
\href{{{linkedin_url}}}{{\underline{{{linkedin_name}}}}} $|$
\href{{{github_url}}}{{\underline{{{github_name}}}}}
\end{{center}}
"#,
        fullname = latex_escape(personal_info.fullname.as_str()),
        number = latex_escape(personal_info.number.as_str()),
        email = latex_escape(personal_info.email.as_str()),
        web_url = latex_escape(personal_info.web_url.as_deref().unwrap_or("")),
        linkedin_url = latex_escape(personal_info.linkedin_url.as_deref().unwrap_or("")),
        linkedin_name = latex_escape(personal_info.linkedin_name.as_str()),
        github_url = latex_escape(personal_info.github_url.as_deref().unwrap_or("")),
        github_name = latex_escape(personal_info.github_name.as_deref().unwrap_or("")),
    )
}

fn resume_tex(resume: &ResumeRequest) -> String {
    let mut tex = String::new();
    let personal = &resume.personal;
    let education_data = &resume.education;
    let experience_data = &resume.experience;
    let project_data = &resume.projects;
    let skills = &resume.skills;
    tex.push_str(r#"
    \documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% serif
% \usepackage{CormorantGaramond}
% \usepackage{charter}


\pagestyle{fancy}
\fancyhf{} % clear all header and footer fields
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}

%----------HEADING----------
% \begin{tabular*}{\textwidth}{l@{\extracolsep{\fill}}r}
%   \textbf{\href{http://sourabhbajaj.com/}{\Large Sourabh Bajaj}} & Email : \href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\
%   \href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\
% \end{tabular*}

    "#);

    let header = personal_info(personal);
    let education_tex = education_info(&education_data);
    let experience_tex = experience_info(&experience_data);
    let project_tex = project_info(&project_data);
    let skill_tex = skills_info(&skills);
    
    tex.push_str(&header);
    tex.push_str(&experience_tex);
    tex.push_str(&project_tex);
    tex.push_str(&education_tex);
    tex.push_str(&skill_tex);

    tex.push_str(r#"
    \end{document}
    "#);

    tex
}





/// Convert LaTeX string to PDF bytes (in memory, per-request).
async fn generate_pdf_from_latex(latex_code: &str) -> Result<Vec<u8>, String> {
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



pub async fn handle_resume(data: web::Json<ResumeRequest>) -> impl Responder {
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