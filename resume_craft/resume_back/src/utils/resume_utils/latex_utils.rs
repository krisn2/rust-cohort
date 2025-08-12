pub fn latex_escape(input: &str) -> String {
    input.replace("&", "\\&")
         .replace("%", "\\%")
         .replace("_", "\\_")
         .replace("#", "\\#")
         .replace("$", "\\$")
         .replace("{", "\\{")
         .replace("}", "\\}")
}

pub fn esc_if_not_empty(value: &str) -> Option<String> {
    if value.trim().is_empty() {
        None
    } else {
        Some(latex_escape(value))
    }
}

pub fn format_date_range(start: &str, end: &str) -> Option<String> {
    match (start.trim().is_empty(), end.trim().is_empty()) {
        (false, false) => Some(format!("{} -- {}", latex_escape(start), latex_escape(end))),
        (false, true) => Some(latex_escape(start)),
        _ => None,
    }
}


// pub fn latex_escape(input: &str) -> String {
//     input.replace("&", "\\&")
//     .replace("%", "\\%")
//     .replace("_", "\\_")
//     .replace("#", "\\#")
//     .replace("$", "\\$")
//     .replace("{", "\\{")
//     .replace("}", "\\}")
//     .replace("~", "\\textasciitilde{}")
//     .replace("^", "\\textasciicircum{}")
//     .replace("\\", "\\textbackslash{}")
//     .replace("|", "\\textbar{}")
//     .replace("<", "\\textless{}")
//     .replace(">", "\\textgreater{}")
//     .replace("`", "\\textasciigrave{}")
//     .replace("\"", "\\textquotedbl{}")
//     .replace("`", "\\textasciigrave{}")
// }