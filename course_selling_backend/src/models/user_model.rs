use serde::{Serialize, Deserialize};
#[derive(Serialize,Deserialize)]
pub struct  Users {
    pub firstname:String,
    pub email:String,
    pub lastname:String,
    pub password: String,
}