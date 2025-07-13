use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Personal {
    pub fullname: String,
    pub number: String,
    pub email: String,
    pub web_url: String,
    pub linkedin_name: String,
    pub linkedin_url: String,
    pub github_name: String,
    pub github_url: String,
}
