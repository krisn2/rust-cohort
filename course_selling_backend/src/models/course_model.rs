use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Course{
    pub title: String,
    pub description: String,
    pub price: f32,
    pub img_url: String,
    pub creator_id: String,
}