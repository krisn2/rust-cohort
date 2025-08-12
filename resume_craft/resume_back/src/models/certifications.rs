use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Certification {
    pub title: String,
    pub date: String,
    pub issuer: String,
    pub certificate_url: Option<String>,
    pub details: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]

pub struct CertificationSchema {
    pub certifications: Vec<Certification>,
}
