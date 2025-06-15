use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Todo {
    pub id: u32,
    pub todo: String,
    pub complete: bool,
}

impl Todo {
    pub fn new(id: u32, todo: String) -> Todo {
        Todo {
            id,
            todo: todo.trim().to_string(),
            complete: false,
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TodoList {
    pub todos: HashMap<u32, Todo>,
    pub next_id: u32,
}

impl TodoList {
    pub fn new() -> TodoList {
        TodoList {
            todos: HashMap::new(),
            next_id: 1,
        }
    }

    pub fn add_todo(&mut self, todo: String) -> Todo {
        let new_todo = Todo::new(self.next_id, todo);
        self.todos.insert(self.next_id, new_todo.clone());
        self.next_id += 1;
        new_todo
    }

    pub fn get_todos(&self) -> Vec<Todo> {
        self.todos.values().cloned().collect()
    }

    pub fn get_todo(&self, id: u32) -> Option<&Todo> {
        self.todos.get(&id)
    }

    pub fn complete_todo(&mut self, id: u32) -> Option<Todo> {
        if let Some(todo) = self.todos.get_mut(&id) {
            todo.complete = true;
            Some(todo.clone())
        } else {
            None
        }
    }

    pub fn update_todo(&mut self, id: u32, new_todo: String) -> Option<Todo> {
        if let Some(todo) = self.todos.get_mut(&id) {
            todo.todo = new_todo.trim().to_string();
            Some(todo.clone())
        } else {
            None
        }
    }

    pub fn delete_todo(&mut self, id: u32) -> Option<Todo> {
        self.todos.remove(&id)
    }
}