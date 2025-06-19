use actix_web::{web, HttpResponse, Result};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;

use crate::model::TodoList;

// Application state
pub struct AppState {
    pub todo_list: Mutex<TodoList>,
}

// Request/Response DTOs
#[derive(Deserialize)]
pub struct CreateTodoRequest {
    pub todo: String,
}

#[derive(Deserialize)]
pub struct UpdateTodoRequest {
    pub todo: Option<String>,
    pub complete: Option<bool>,
}

#[derive(Serialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: Option<T>,
}

impl<T> ApiResponse<T> {
    pub fn success(message: &str, data: T) -> Self {
        ApiResponse {
            success: true,
            message: message.to_string(),
            data: Some(data),
        }
    }

    pub fn error(message: &str) -> ApiResponse<()> {
        ApiResponse {
            success: false,
            message: message.to_string(),
            data: None,
        }
    }
}

// File operations
pub fn load_todos() -> TodoList {
    match File::open("todos.json") {
        Ok(file) => {
            let reader = BufReader::new(file);
            match serde_json::from_reader(reader) {
                Ok(todo_list) => todo_list,
                Err(_) => {
                    println!("Error reading JSON file, starting with empty todo list");
                    TodoList::new()
                }
            }
        }
        Err(_) => {
            println!("No existing todo file found, starting fresh");
            TodoList::new()
        }
    }
}

pub fn save_todos(todo_list: &TodoList) -> std::io::Result<()> {
    let mut file = File::create("todos.json")?;
    let json = serde_json::to_string_pretty(todo_list)?;
    file.write_all(json.as_bytes())?;
    Ok(())
}

// Route handlers

// GET /todos - Get all todos
pub async fn get_todos(data: web::Data<AppState>) -> Result<HttpResponse> {
    let todo_list = data.todo_list.lock().unwrap();
    let todos = todo_list.get_todos();
    Ok(HttpResponse::Ok().json(ApiResponse::success("Todos retrieved successfully", todos)))
}

// GET /todos/{id} - Get todo by ID
pub async fn get_todo(
    data: web::Data<AppState>,
    path: web::Path<u32>,
) -> Result<HttpResponse> {
    let todo_list = data.todo_list.lock().unwrap();
    let id = path.into_inner();
    
    match todo_list.get_todo(id) {
        Some(todo) => Ok(HttpResponse::Ok().json(ApiResponse::success("Todo found", todo.clone()))),
        None => Ok(HttpResponse::NotFound().json(ApiResponse::<()>::error("Todo not found"))),
    }
}

// POST /todos - Create new todo
pub async fn create_todo(
    data: web::Data<AppState>,
    req: web::Json<CreateTodoRequest>,
) -> Result<HttpResponse> {
    if req.todo.trim().is_empty() {
        return Ok(HttpResponse::BadRequest().json(ApiResponse::<()>::error("Todo cannot be empty")));
    }

    let mut todo_list = data.todo_list.lock().unwrap();
    let new_todo = todo_list.add_todo(req.todo.clone());
    
    // Save to file
    if let Err(_) = save_todos(&todo_list) {
        return Ok(HttpResponse::InternalServerError().json(ApiResponse::<()>::error("Failed to save todo")));
    }
    
    Ok(HttpResponse::Created().json(ApiResponse::success("Todo created successfully", new_todo)))
}

// PUT /todos/{id} - Update todo
pub async fn update_todo(
    data: web::Data<AppState>,
    path: web::Path<u32>,
    req: web::Json<UpdateTodoRequest>,
) -> Result<HttpResponse> {
    let mut todo_list = data.todo_list.lock().unwrap();
    let id = path.into_inner();
    
    let updated_todo = if let Some(new_todo_text) = &req.todo {
        if new_todo_text.trim().is_empty() {
            return Ok(HttpResponse::BadRequest().json(ApiResponse::<()>::error("Todo cannot be empty")));
        }
        todo_list.update_todo(id, new_todo_text.clone())
    } else if let Some(complete) = req.complete {
        if complete {
            todo_list.complete_todo(id)
        } else {
            // Allow marking as incomplete
            if let Some(todo) = todo_list.todos.get_mut(&id) {
                todo.complete = false;
                Some(todo.clone())
            } else {
                None
            }
        }
    } else {
        return Ok(HttpResponse::BadRequest().json(ApiResponse::<()>::error("No update data provided")));
    };

    match updated_todo {
        Some(todo) => {
            // Save to file
            if let Err(_) = save_todos(&todo_list) {
                return Ok(HttpResponse::InternalServerError().json(ApiResponse::<()>::error("Failed to save todo")));
            }
            Ok(HttpResponse::Ok().json(ApiResponse::success("Todo updated successfully", todo)))
        }
        None => Ok(HttpResponse::NotFound().json(ApiResponse::<()>::error("Todo not found"))),
    }
}

// DELETE /todos/{id} - Delete todo
pub async fn delete_todo(
    data: web::Data<AppState>,
    path: web::Path<u32>,
) -> Result<HttpResponse> {
    let mut todo_list = data.todo_list.lock().unwrap();
    let id = path.into_inner();
    
    match todo_list.delete_todo(id) {
        Some(deleted_todo) => {
            // Save to file
            if let Err(_) = save_todos(&todo_list) {
                return Ok(HttpResponse::InternalServerError().json(ApiResponse::<()>::error("Failed to save changes")));
            }
            Ok(HttpResponse::Ok().json(ApiResponse::success("Todo deleted successfully", deleted_todo)))
        }
        None => Ok(HttpResponse::NotFound().json(ApiResponse::<()>::error("Todo not found"))),
    }
}

// Health check endpoint
pub async fn health_check() -> Result<HttpResponse> {
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "status": "healthy",
        "message": "Todo API is running"
    })))
}