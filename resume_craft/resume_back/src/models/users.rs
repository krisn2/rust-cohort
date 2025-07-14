
pub struct User {
    name: String,
    password:String, 
    email: String,
    phone: String,
}

impl User {
    pub fn new(name:String, password:String, email:String, phone:String)-> Self {
        User {
            name,
            password,
            email,
            phone
        }
    }
}