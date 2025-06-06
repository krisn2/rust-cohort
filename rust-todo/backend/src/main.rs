use std::fs::File;
use std::io::prelude::*;
use std::io::{self, BufReader, Result};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct Todo {
    id: u32,
    todo: String,
    complete: bool,
}

impl Todo {
    fn new(id: u32, todo: String) -> Todo {
        Todo {
            id,
            todo: todo.trim().to_string(),
            complete: false,
        }
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct TodoList {
    todos: HashMap<u32, Todo>,
    next_id: u32,
}

impl TodoList {
    fn new() -> TodoList {
        TodoList {
            todos: HashMap::new(),
            next_id: 1,
        }
    }

    fn add_todo(&mut self, todo: String) {
        let new_todo = Todo::new(self.next_id, todo);
        self.todos.insert(self.next_id, new_todo);
        self.next_id += 1;
        println!("Todo added successfully!");
    }

    fn list_todos(&self) {
        if self.todos.is_empty() {
            println!("No todos found!");
            return;
        }

        println!("\n=== Your Todos ===");
        for (_, todo) in &self.todos {
            let status = if todo.complete { "✓" } else { "✗" };
            println!("{}: [{}] {}", todo.id, status, todo.todo);
        }
        println!();
    }

    fn complete_todo(&mut self, id: u32) {
        match self.todos.get_mut(&id) {
            Some(todo) => {
                todo.complete = true;
                println!("Todo {} marked as complete!", id);
            }
            None => println!("Todo with id {} not found!", id),
        }
    }

    fn delete_todo(&mut self, id: u32) {
        match self.todos.remove(&id) {
            Some(_) => println!("Todo {} deleted successfully!", id),
            None => println!("Todo with id {} not found!", id),
        }
    }
}

fn load_todos() -> Result<TodoList> {
    match File::open("todos.json") {
        Ok(file) => {
            let reader = BufReader::new(file);
            match serde_json::from_reader(reader) {
                Ok(todo_list) => Ok(todo_list),
                Err(_) => {
                    println!("Error reading JSON file, starting with empty todo list");
                    Ok(TodoList::new())
                }
            }
        }
        Err(_) => {
            println!("No existing todo file found, starting fresh");
            Ok(TodoList::new())
        }
    }
}

fn save_todos(todo_list: &TodoList) -> Result<()> {
    let mut file = File::create("todos.json")?;
    let json = serde_json::to_string_pretty(todo_list)?;
    file.write_all(json.as_bytes())?;
    Ok(())
}

fn get_user_input(prompt: &str) -> String {
    print!("{}", prompt);
    io::stdout().flush().unwrap();
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    input.trim().to_string()
}

fn show_menu() {
    println!("\n=== Todo App ===");
    println!("1. Add Todo");
    println!("2. List Todos");
    println!("3. Complete Todo");
    println!("4. Delete Todo");
    println!("5. Exit");
    println!("================");
}

fn main() -> Result<()> {
    let mut todo_list = load_todos()?;
    
    loop {
        show_menu();
        let choice = get_user_input("Enter your choice (1-5): ");
        
        match choice.as_str() {
            "1" => {
                let todo = get_user_input("Enter the todo: ");
                if !todo.is_empty() {
                    todo_list.add_todo(todo);
                    save_todos(&todo_list)?;
                } else {
                    println!("Todo cannot be empty!");
                }
            }
            "2" => {
                todo_list.list_todos();
            }
            "3" => {
                todo_list.list_todos();
                let id_str = get_user_input("Enter todo ID to complete: ");
                match id_str.parse::<u32>() {
                    Ok(id) => {
                        todo_list.complete_todo(id);
                        save_todos(&todo_list)?;
                    }
                    Err(_) => println!("Invalid ID! Please enter a number."),
                }
            }
            "4" => {
                todo_list.list_todos();
                let id_str = get_user_input("Enter todo ID to delete: ");
                match id_str.parse::<u32>() {
                    Ok(id) => {
                        todo_list.delete_todo(id);
                        save_todos(&todo_list)?;
                    }
                    Err(_) => println!("Invalid ID! Please enter a number."),
                }
            }
            "5" => {
                println!("Goodbye!");
                break;
            }
            _ => {
                println!("Invalid choice! Please enter 1-5.");
            }
        }
    }
    
    Ok(())
}