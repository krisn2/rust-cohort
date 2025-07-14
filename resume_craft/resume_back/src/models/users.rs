use serde::{Serialize,Deserialize};
#[derive(Serialize, Deserialize)]
pub struct User {
    name: String,
    password:String, 
    email: String,
    phone: String,
}
