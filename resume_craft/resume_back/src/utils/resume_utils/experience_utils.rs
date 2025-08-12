use crate::models::experience::ExperienceSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn experience_utils(experience_schema: &ExperienceSchema) -> String {
    if experience_schema.experiences.is_empty() {
        return String::new();
    }

    let mut tex = String::new();
    tex.push_str("\\section{Experience}\n  \\resumeSubHeadingListStart\n");

    for exp in &experience_schema.experiences {
        // Format date range
        let date_range = match (
            exp.start_date.trim().is_empty(),
            exp.end_date.trim().is_empty(),
        ) {
            (false, false) => format!(
                "{} -- {}",
                latex_escape(exp.start_date.as_str()),
                latex_escape(exp.end_date.as_str())
            ),
            (false, true) => latex_escape(exp.start_date.as_str()),
            _ => String::new(),
        };

        // Company location
        let location = if !exp.address.trim().is_empty() {
            latex_escape(exp.address.as_str())
        } else {
            String::new()
        };

        // Experience heading
        tex.push_str(&format!(
            "    \\resumeSubheading\n      {{{}}}{{{}}}\n      {{{}}}{{{}}}\n",
            latex_escape(exp.position.as_str()),
            date_range,
            latex_escape(exp.company_name.as_str()),
            location
        ));

        // Job description lines
        if !exp.job_des.lines.is_empty() {
            tex.push_str("      \\resumeItemListStart\n");
            for line in &exp.job_des.lines {
                if !line.trim().is_empty() {
                    tex.push_str(&format!(
                        "        \\resumeItem{{{}}}\n",
                        latex_escape(line)
                    ));
                }
            }
            tex.push_str("      \\resumeItemListEnd\n");
        }
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}
