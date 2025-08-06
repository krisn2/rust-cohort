

pub fn latex_escape(input: &str) -> String {
    input.replace("&", "\\&")
    .replace("%", "\\%")
    .replace("_", "\\_")
    .replace("#", "\\#")
    .replace("$", "\\$")
    .replace("{", "\\{")
    .replace("}", "\\}")
    .replace("~", "\\textasciitilde{}")
    .replace("^", "\\textasciicircum{}")
    .replace("\\", "\\textbackslash{}")
    .replace("|", "\\textbar{}")
    .replace("<", "\\textless{}")
    .replace(">", "\\textgreater{}")
    .replace("`", "\\textasciigrave{}")
    .replace("\"", "\\textquotedbl{}")
    .replace("`", "\\textasciigrave{}")
}