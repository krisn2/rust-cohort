use crate::models::education::EducationSchema;
use crate::utils::resume_utils::latex_utils::{latex_escape, esc_if_not_empty, format_date_range};
pub fn education_utils(education_schema: &EducationSchema) -> String {
    if education_schema.educations.is_empty() {
        return String::new();
    }

    let mut tex = String::from("\\section{Education}\n  \\resumeSubHeadingListStart\n");

    for edu in &education_schema.educations {
        let address = esc_if_not_empty(&edu.address).unwrap_or_default();
        let degree_dates = format_date_range(&edu.start_date, &edu.end_date).unwrap_or_default();

        tex.push_str(&format!(
            "    \\resumeSubheading\n      {{{}}}{{{}}}\n      {{{}}}{{{}}}\n",
            latex_escape(&edu.school),
            address,
            latex_escape(&edu.degree),
            degree_dates
        ));
    }

    tex.push_str("  \\resumeSubHeadingListEnd\n");
    tex
}
