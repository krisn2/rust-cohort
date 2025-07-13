use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SkillCategory {
    pub category_name: String,
    pub items: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SkillSchema {
    pub categories: Vec<SkillCategory>,
}