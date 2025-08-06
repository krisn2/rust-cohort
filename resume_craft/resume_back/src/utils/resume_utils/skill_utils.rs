use crate::models::skills::SkillSchema;
use crate::utils::resume_utils::latex_utils::latex_escape;

pub fn skills_utils(skills:&SkillSchema)->String {
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