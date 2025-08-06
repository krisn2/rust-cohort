use crate::models::experience::ExperienceSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn experience_utils(experience_schema: &ExperienceSchema) -> String {
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