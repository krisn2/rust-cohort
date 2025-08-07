pub fn extract_projects_from_resume(text: &str) -> Vec<String> {
    let mut projects = Vec::new();
    let lines = text.lines().collect::<Vec<_>>();

    let mut capture = false;
    let mut project_text = String::new();

    for line in lines {
        if line.to_lowercase().contains("project") {
            capture = true;
        } else if line.trim().is_empty() && capture {
            projects.push(project_text.trim().to_string());
            project_text.clear();
            capture = false;
        }

        if capture {
            project_text.push_str(line);
            project_text.push('\n');
        }
    }

    if !project_text.trim().is_empty() {
        projects.push(project_text.trim().to_string());
    }

    projects
}
