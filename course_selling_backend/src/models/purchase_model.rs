use serde::{Serialize, Deserialize};
use mongodb::bson::oid::ObjectId;

#[derive(Serialize, Deserialize)]
pub struct PurchaseCourse{
    pub course_id: ObjectId,
    pub user_id: ObjectId,
}