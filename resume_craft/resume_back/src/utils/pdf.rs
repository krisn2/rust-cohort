use lopdf::Document;

pub fn extract_text_from_pdf(path: &str) -> Result<String, Box<dyn std::error::Error>> {
    let doc = Document::load(path)?;
    let mut full_text = String::new();

    for page_id in doc.get_pages().values() {
        let page = doc.get_page_content(*page_id)?;
        let content = lopdf::content::Content::decode(&page)?;

        for op in content.operations {
            if op.operator == "Tj" || op.operator == "TJ" {
                for arg in op.operands {
                    if let lopdf::Object::String(text, _) = arg {
                        full_text.push_str(&String::from_utf8_lossy(&text));
                        full_text.push('\n');
                    }
                }
            }
        }
    }

    Ok(full_text)
}
