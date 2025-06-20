use actix_web::{web, App, HttpServer, middleware::Logger};
use std::sync::Mutex;
use actix_cors::Cors;

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
    println!("  GET    /todo/{{id}}       - Get todo by ID");
    println!("  POST   /todo            - Create new todo");
    println!("  PUT    /todo/{{id}}       - Update todo");
    println!("  DELETE /todo/{{id}}       - Delete todo");

    HttpServer::new(move || {

         let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![
                actix_web::http::header::AUTHORIZATION,
                actix_web::http::header::CONTENT_TYPE,
            ])
            .max_age(3600);

        App::new()
            .app_data(app_state.clone())
            .wrap(Logger::default())
            .wrap(cors)
            .route("/health", web::get().to(health_check))
            .route("/todos", web::get().to(get_todos))
            .route("/todo/{id}", web::get().to(get_todo))
            .route("/todo", web::post().to(create_todo))
            .route("/todo/{id}", web::put().to(update_todo))
            .route("/todo/{id}", web::delete().to(delete_todo))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}