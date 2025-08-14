use jsonwebtoken::{encode, Header, EncodingKey, DecodingKey, Validation, Algorithm};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}


pub fn create_jwt(id: String, secreat: &str) -> String {
     let claims = Claims {
        sub : id,
        exp: 10000000000, // Set expiration time as needed
     };

     let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secreat.as_ref()))
         .expect("Failed to create JWT");
    token
}

pub fn verify_jwt(token: &str, secreat: &str)-> Result<Claims, jsonwebtoken::errors::Error> {
    let token_data = jsonwebtoken::decode(token, &DecodingKey::from_secret(secreat.as_ref()), &Validation::new(Algorithm::HS256))?;
    Ok(token_data.claims)
}