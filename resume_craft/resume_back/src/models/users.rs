use serde::{Serialize, Deserialize};
use mongodb::bson::oid::ObjectId;

#[derive(Serialize, Deserialize)]
pub struct User {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub name: String,
    pub email: String,
    pub phone: String,
    pub password: String, // Store hashed password
}

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}
