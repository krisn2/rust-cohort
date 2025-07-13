use crate::models::common::DesLine;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Experience {
    pub position: String,
    pub start_date: String,
    pub end_date: String,
    pub company_name: String,
    pub address: String,
    pub job_des: DesLine,
}

#[derive(Serialize, Deserialize, Debug, Clone)]

pub struct ExperienceSchema {
    pub experiences: Vec<Experience>,
}
