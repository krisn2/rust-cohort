use serde::{Serialize, Deserialize};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::error::Error;
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug)]
struct Claims {
    id: String,
    exp: usize,
}

struct TokenStore {
    map : HashMap<String,String>,
}

impl TokenStore {
    fn new() ->Self {
        Self { map: HashMap::new(), }
    }

    fn store_token(&mut self, user_id:&str, token:String){
        self.map.insert(user_id.to_string(), token);
    }

    // fn get_token(&mut self, user_id:&str)->Option<String>{
    //     self.map.get(user_id);
    // }

    // fn invalidate_token(&mut self, user_id:&str){
    //     self.map.remove(user_id)
    // }
}

fn encrypt_token(claims_ref: &Claims, secret: &str) -> Result<String, Box<dyn Error>> {
    let token = encode(&Header::default(), claims_ref, &EncodingKey::from_secret(secret.as_ref()))?;
    Ok(token)
}

fn main() -> Result<(), Box<dyn Error>> {

    let mut session_store = TokenStore::new();

    let myclaim = Claims {
        id: "02122004".to_string(),
        exp: 10000000000,
    };

    let secret = "02KRISN";

    let token = encrypt_token(&myclaim, secret)?;
    session_store.store_token(&myclaim.id, token.clone());
    println!("\n✅ Token Generated & Stored:\n{}", token);

    let de_token = decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_ref()), &Validation::default())?;
    println!("\nDecoded token:\n{:?}", de_token);

    let id = de_token.claims.id;
    println!("\nUser ID from token: {}", id);

    Ok(())
}
