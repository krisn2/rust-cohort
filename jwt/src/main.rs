use serde::{Serialize, Deserialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::error::Error;
use std::collections::HashMap;

use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash,PasswordHasher, PasswordVerifier, SaltString,
    },
    Argon2
};

// JWT claims structure
#[derive(Serialize, Deserialize, Debug)]
struct Claims {
    id: String,
    exp: usize,
}

// Simple in-memory token store
struct TokenStore {
    map: HashMap<String, String>,
}

impl TokenStore {
    fn new() -> Self {
        Self {
            map: HashMap::new(),
        }
    }

    fn store_token(&mut self, user_id: &str, token: String) {
        self.map.insert(user_id.to_string(), token);
    }

    fn get_token(&self, user_id: &str) -> Option<&String> {
        self.map.get(user_id)
    }

    fn invalidate_token(&mut self, user_id: &str) {
        self.map.remove(user_id);
    }
}

// Encrypt claims to JWT token
fn encrypt_token(claims_ref: &Claims, secret: &str) -> Result<String, Box<dyn Error>> {
    let token = encode(&Header::default(), claims_ref, &EncodingKey::from_secret(secret.as_ref()))?;
    Ok(token)
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut session_store = TokenStore::new();
    let password = b"krishna_02@"; 

    // 🔐 Generate a secure salt
    let salt = SaltString::try_from_rng(&mut OsRng)
    .expect("Failed to generate random salt");


    // 🔐 Create a default Argon2 hasher
    let argon2 = Argon2::default();

    // 🔐 Hash the password
    let password_hash = argon2.hash_password(password, &salt)?.to_string();
    println!("\n🔐 Hashed Password:\n{}", password_hash);

    // ✅ Simulate login - verify password against stored hash
    let parsed_hash = PasswordHash::new(&password_hash)?;
    if argon2.verify_password(password, &parsed_hash).is_ok() {
        println!("\n✅ Password verified successfully.");

        // Create a new claim
        let myclaim = Claims {
            id: "02122004".to_string(),
            exp: 10000000000,
        };

        let secret = "02KRISN";

        // Generate JWT token
        let token = encrypt_token(&myclaim, secret)?;
        session_store.store_token(&myclaim.id, token.clone());

        println!("\n🪙 Token Generated & Stored:\n{}", token);

        // Decode the token
        let de_token = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())?;
        println!("\n📥 Decoded Token:\n{:?}", de_token);

        println!("\n👤 User ID from token: {}", de_token.claims.id);
    } else {
        println!("\n❌ Invalid password!");
    }

    Ok(())
}
