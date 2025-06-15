use actix_web::{web, App, HttpServer, middleware::Logger};
use std::sync::Mutex;

mod model;
mod controllers;

use controllers::{
    AppState, 
    load_todos,
    get_todos, 
    get_todo, 
    create_todo, 
    update_todo, 
    delete_todo, 
    health_check
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();
    
    // Load existing todos
    let todo_list = load_todos();
    let app_state = web::Data::new(AppState {
        todo_list: Mutex::new(todo_list),
    });

    println!("Starting Todo API server on http://localhost:8080");
    println!("Available endpoints:");
    println!("  GET    /health           - Health check");
    println!("  GET    /todos            - Get all todos");
    println!("  GET    /todos/{{id}}       - Get todo by ID");
    println!("  POST   /todos            - Create new todo");
    println!("  PUT    /todos/{{id}}       - Update todo");
    println!("  DELETE /todos/{{id}}       - Delete todo");

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .wrap(Logger::default())
            .route("/health", web::get().to(health_check))
            .route("/todos", web::get().to(get_todos))
            .route("/todos/{id}", web::get().to(get_todo))
            .route("/todos", web::post().to(create_todo))
            .route("/todos/{id}", web::put().to(update_todo))
            .route("/todos/{id}", web::delete().to(delete_todo))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}