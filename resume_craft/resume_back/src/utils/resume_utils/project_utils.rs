use crate::models::projects::ProjectSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn project_utils(project_schema: &ProjectSchema) -> String {
    let mut tex = String::new();
    if project_schema.projects.is_empty() {
        return tex;
    }
    tex.push_str("\\section{Projects}\n  \\resumeSubHeadingListStart\n");
    
    for project in &project_schema.projects {
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