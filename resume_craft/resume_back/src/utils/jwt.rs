use jsonwebtoken::{encode, decode, DecodingKey, EncodingKey, Header, Validation, Algorithm};
use serde::{Serialize, Deserialize};
use chrono::{Utc, Duration};

const SECRET_KEY: &[u8] = b"your-secret-key"; // Move to ENV in production

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub fn create_jwt(user_id: String) -> String {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .unwrap()
        .timestamp() as usize;

    let claims = Claims { sub: user_id, exp: expiration };

    encode(&Header::default(), &claims, &EncodingKey::from_secret(SECRET_KEY)).unwrap()
}

pub fn verify_jwt(token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
    decode::<Claims>(token, &DecodingKey::from_secret(SECRET_KEY), &Validation::new(Algorithm::HS256)).map(|data| data.claims)
}
