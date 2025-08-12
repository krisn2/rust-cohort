use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Personal {
    pub fullname: String,
    pub number: String,
    pub email: String,
    pub web_url: Option<String>,
    pub linkedin_url: Option<String>,
    pub linkedin_name: Option<String>,
    pub github_url: Option<String>,
    pub github_name: Option<String>,
    pub address: Option<String>,
}
