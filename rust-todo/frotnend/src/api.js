const API_BASE_URL = 'http://localhost:8080';

class TodoAPI {
  static async fetchTodos() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

  // Get single todo by ID
  static async fetchTodoById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch todo: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      return Array.isArray(data.data) ? data.data.todo : null;
    } catch (error) {
      console.error('Error fetching todo:', error);
      throw error;
    }
  }

  // Create new todo
  static async createTodo(todoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         todo: todoData
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to create todo: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  }

  // Update existing todo
  static async updateTodo(id, todoData) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  // Delete todo
  static async deleteTodo(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status} ${response.statusText}`);
      }
      
      // Some APIs return the deleted item, others return empty response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}

export default TodoAPI;