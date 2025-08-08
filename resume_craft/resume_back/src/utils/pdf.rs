use lopdf::{Document, Object};

pub fn extract_text_from_pdf(path: &str) -> Result<String, Box<dyn std::error::Error>> {
    let doc = Document::load(path)?;
    let mut full_text = String::new();

    for (_page_num, page_id) in doc.get_pages() {
        let content_data = doc.get_page_content(page_id)?;
        let content = lopdf::content::Content::decode(&content_data)?;

        for op in content.operations {
            match op.operator.as_str() {
                "Tj" => {
                    if let Some(Object::String(text, _)) = op.operands.get(0) {
                        full_text.push_str(&String::from_utf8_lossy(text));
                        full_text.push('\n');
                    }
                }
                "TJ" => {
                    if let Some(Object::Array(elems)) = op.operands.get(0) {
                        for elem in elems {
                            if let Object::String(text, _) = elem {
                                full_text.push_str(&String::from_utf8_lossy(text));
                            }
                        }
                        full_text.push('\n');
                    }
                }
                _ => {}
            }
        }
    }

    Ok(full_text)
}
