use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Admin{
     #[serde(rename="_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
}