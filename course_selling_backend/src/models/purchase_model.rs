use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct PurchaseCourse{
    pub course_id: String,
    pub user_id: String,
}