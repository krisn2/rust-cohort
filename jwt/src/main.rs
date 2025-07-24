use serde::{Serialize, Deserialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::error::Error;

#[derive(Serialize, Deserialize, Debug)]
struct Claims {
    id: String,
    exp: usize,
}

fn encrypt_token(claims_ref: &Claims, secret: &str) -> Result<String, Box<dyn Error>> {
    let token = encode(&Header::default(), claims_ref, &EncodingKey::from_secret(secret.as_ref()))?;
    Ok(token)
}

fn main() -> Result<(), Box<dyn Error>> {
    let myclaim = Claims {
        id: "02122004".to_string(),
        exp: 10000000000,
    };

    let secret = "02KRISN";

    let token = encrypt_token(&myclaim, secret)?;
    println!("Encoded token:\n{}", token);

    let de_token = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())?;
    println!("\nDecoded token:\n{:?}", de_token);

    let id = de_token.claims.id;
    println!("\nUser ID from token: {}", id);

    Ok(())
}
