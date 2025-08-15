use serde::{Serialize, Deserialize};
use mongodb::bson::oid::ObjectId;

#[derive(Serialize, Deserialize)]
pub struct Course{
    #[serde(rename="_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub title: String,
    pub description: String,
    pub price: f32,
    pub img_url: String,
    pub creator_id: ObjectId,
}

#[derive(Serialize, Deserialize)]
pub struct CourseUpdate {
    pub title: Option<String>,
    pub description: Option<String>,
    pub price: Option<f32>,
    pub img_url: Option<String>,
}

#[derive(Serialize, Deserialize,Debug)]
pub struct PurchaseCourse {
   pub  user_id: ObjectId,
   pub  course_id: ObjectId
}