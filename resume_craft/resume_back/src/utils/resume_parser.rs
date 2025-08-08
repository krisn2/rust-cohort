pub fn extract_projects_from_resume(text: &str) -> Vec<String> {
    let mut projects = Vec::new();
    let lines: Vec<&str> = text.lines().collect();

    let mut in_project_section = false;
    let mut current_project = String::new();

    for line in lines {
        let line = line.trim();

        // Check for start of project section
        if line.to_lowercase().contains("project") && line.len() < 30 {
            in_project_section = true;
            continue;
        }

        // End of section
        if in_project_section && line.is_empty() && !current_project.is_empty() {
            projects.push(current_project.trim().to_string());
            current_project.clear();
            continue;
        }

        if in_project_section {
            // Accumulate bullet/numbered items
            if line.starts_with("*") || line.starts_with("-") || line.chars().next().unwrap_or(' ').is_numeric() {
                current_project.push_str("\n");
                current_project.push_str(line);
            } else {
                current_project.push_str(" ");
                current_project.push_str(line);
            }
        }
    }

    // Push last project if still pending
    if !current_project.trim().is_empty() {
        projects.push(current_project.trim().to_string());
    }

    projects
}
