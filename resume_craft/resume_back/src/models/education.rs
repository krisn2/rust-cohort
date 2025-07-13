use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Educations {
    pub school: String,
    pub degree: String,
    pub start_date: String,
    pub end_date: String,
    pub address: String,
}
#[derive(Serialize, Deserialize, Debug, Clone)]

pub struct EducationSchema {
    pub educations: Vec<Educations>,
}