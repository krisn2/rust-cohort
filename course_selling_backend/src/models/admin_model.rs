use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Admin{
    pub firstname: String,
    pub lastname: String,
    pub email: String,
    pub password: String,
}