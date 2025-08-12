use crate::models::projects::ProjectSchema;
use crate::utils::resume_utils::latex_utils::{latex_escape, format_date_range};

pub fn project_utils(project_schema: &ProjectSchema) -> String {
    if project_schema.projects.is_empty() {
        return String::new();
    }

    let mut tex = String::from("\\section{Projects}\n  \\resumeSubHeadingListStart\n");

    for project in &project_schema.projects {
        let date_range = format_date_range(&project.start_date, &project.end_date).unwrap_or_default();
        let tech_stack = project.tech_stack.clone().unwrap_or_default();

        tex.push_str("    \\resumeProjectHeading\n");
        tex.push_str(&format!(
            "        {{\\textbf{{{}}} $|$ \\emph{{{}}}}}{{{}}}\n",
            latex_escape(&project.name),
            latex_escape(&tech_stack),
            date_range
        ));

        if !project.project_des.lines.is_empty() {
            tex.push_str("        \\resumeItemListStart\n");
            for item in &project.project_des.lines {
                if !item.trim().is_empty() {
                    tex.push_str(&format!("          \\resumeItem{{{}}}\n", latex_escape(item)));
                }
            }
            tex.push_str("        \\resumeItemListEnd\n");
        }
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}
