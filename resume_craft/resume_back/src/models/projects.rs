use crate::models::common::DesLine;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
    pub name: String,
    pub tech_stack: Option<String>,
    pub start_date: String,
    pub end_date: String,
    pub project_des: DesLine,
}
#[derive(Serialize, Deserialize, Debug, Clone)]

pub struct ProjectSchema {
    pub projects:Vec<Project>
}
