const API_BASE = 'http://localhost:8080';

const TodoAPI = {
  // Fetch all todos
  fetchTodos: async () => {
    const response = await fetch(`${API_BASE}/todos`);
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch todos');
    }
    
    return result.data; // Return the data array
  },

  // Create new todo
  createTodo: async (todoText) => {
    const response = await fetch(`${API_BASE}/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: todoText }), // API expects { todo: "text" }
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to create todo');
    }
    
    return result.data;
  },

  // Update todo (only completion status is supported by your API)
  updateTodo: async (id, complete) => {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complete }), // API expects { complete: boolean }
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to update todo');
    }
    
    return result.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE}/todo/${id}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to delete todo');
    }
    
    return result.data;
  },
};

export default TodoAPI;
