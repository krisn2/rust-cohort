use actix_web::{web, HttpResponse, Result};
use sqlx::PgPool;
use uuid::Uuid;
use crate::models::{User, CreateUserRequest, UpdateUserRequest};

pub async fn get_users(pool: web::Data<PgPool>) -> Result<HttpResponse> {
    let users = sqlx::query_as::<_, User>(
        "SELECT id, name, email, created_at, updated_at FROM users ORDER BY created_at DESC"
    )
    .fetch_all(pool.get_ref())
    .await;

    match users {
        Ok(users) => Ok(HttpResponse::Ok().json(users)),
        Err(e) => {
            eprintln!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json("Failed to fetch users"))
        }
    }
}

pub async fn get_user(
    pool: web::Data<PgPool>,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let user_id = path.into_inner();
    
    let user = sqlx::query_as::<_, User>(
        "SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1"
    )
    .bind(user_id)
    .fetch_optional(pool.get_ref())
    .await;

    match user {
        Ok(Some(user)) => Ok(HttpResponse::Ok().json(user)),
        Ok(None) => Ok(HttpResponse::NotFound().json("User not found")),
        Err(e) => {
            eprintln!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json("Failed to fetch user"))
        }
    }
}

pub async fn create_user(
    pool: web::Data<PgPool>,
    user_data: web::Json<CreateUserRequest>,
) -> Result<HttpResponse> {
    let new_id = Uuid::new_v4();
    let now = chrono::Utc::now();

    let user = sqlx::query_as::<_, User>(
        "INSERT INTO users (id, name, email, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, name, email, created_at, updated_at"
    )
    .bind(new_id)
    .bind(&user_data.name)
    .bind(&user_data.email)
    .bind(now)
    .bind(now)
    .fetch_one(pool.get_ref())
    .await;

    match user {
        Ok(user) => Ok(HttpResponse::Created().json(user)),
        Err(sqlx::Error::Database(db_err)) => {
            if db_err.constraint().is_some() {
                Ok(HttpResponse::Conflict().json("Email already exists"))
            } else {
                eprintln!("Database error: {}", db_err);
                Ok(HttpResponse::InternalServerError().json("Failed to create user"))
            }
        }
        Err(e) => {
            eprintln!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json("Failed to create user"))
        }
    }
}
pub async fn update_user(
    pool: web::Data<PgPool>,
    path: web::Path<Uuid>,
    user_data: web::Json<UpdateUserRequest>,
) -> Result<HttpResponse> {
    let user_id = path.into_inner();
    let now = chrono::Utc::now();

    let mut query = "UPDATE users SET updated_at = $1".to_string();
    let mut param_count = 2;
    let mut binds: Vec<String> = vec![];

    if user_data.name.is_some() {
        query.push_str(&format!(", name = ${}", param_count));
        binds.push("name".to_string());
        param_count += 1;
    }

    if user_data.email.is_some() {
        query.push_str(&format!(", email = ${}", param_count));
        binds.push("email".to_string());
        param_count += 1;
    }

    query.push_str(&format!(
        " WHERE id = ${} RETURNING id, name, email, created_at, updated_at",
        param_count
    ));

    let mut query_builder = sqlx::query_as::<_, User>(&query);

    query_builder = query_builder.bind(now); // $1

    for field in &binds {
        match field.as_str() {
            "name" => query_builder = query_builder.bind(user_data.name.as_ref().unwrap()),
            "email" => query_builder = query_builder.bind(user_data.email.as_ref().unwrap()),
            _ => {}
        }
    }

    query_builder = query_builder.bind(user_id); // Last param: user_id

    let user = query_builder.fetch_optional(pool.get_ref()).await;

    match user {
        Ok(Some(user)) => Ok(HttpResponse::Ok().json(user)),
        Ok(None) => Ok(HttpResponse::NotFound().json("User not found")),
        Err(sqlx::Error::Database(db_err)) => {
            if db_err.constraint().is_some() {
                Ok(HttpResponse::Conflict().json("Email already exists"))
            } else {
                eprintln!("Database error: {}", db_err);
                Ok(HttpResponse::InternalServerError().json("Failed to update user"))
            }
        }
        Err(e) => {
            eprintln!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json("Failed to update user"))
        }
    }
}


pub async fn delete_user(
    pool: web::Data<PgPool>,
    path: web::Path<Uuid>,
) -> Result<HttpResponse> {
    let user_id = path.into_inner();

    let result = sqlx::query("DELETE FROM users WHERE id = $1")
        .bind(user_id)
        .execute(pool.get_ref())
        .await;

    match result {
        Ok(rows) => {
            if rows.rows_affected() > 0 {
                Ok(HttpResponse::NoContent().finish())
            } else {
                Ok(HttpResponse::NotFound().json("User not found"))
            }
        }
        Err(e) => {
            eprintln!("Database error: {}", e);
            Ok(HttpResponse::InternalServerError().json("Failed to delete user"))
        }
    }
}
