use crate::models::education::EducationSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn education_utils(education_schema: &EducationSchema) -> String {
    let mut tex = String::new();
    if education_schema.educations.is_empty() {
        return tex;
    }
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