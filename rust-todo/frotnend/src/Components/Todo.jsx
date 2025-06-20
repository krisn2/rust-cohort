import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';
import ProgressStats from './ProgressStats';
import EmptyState from './EmptyState';
import TodoAPI from '../api';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operationLoading, setOperationLoading] = useState(false);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await TodoAPI.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo - FIXED: Pass just the text, not an object
  const addTodo = async (todoText) => {
    try {
      setOperationLoading(true);
      setError(null);
      const newTodo = await TodoAPI.createTodo(todoText); // Just pass the text
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err.message);
    } finally {
      setOperationLoading(false);
    }
  };

  // Toggle todo completion - FIXED: Pass just the completion status
  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      setOperationLoading(true);
      setError(null);
      const updatedTodo = await TodoAPI.updateTodo(id, !todo.complete); // Pass boolean
      setTodos(prev => prev.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err.message);
    } finally {
      setOperationLoading(false);
    }
  };

  // REMOVED: Edit todo function - Your API doesn't support editing todo text
  // Only completion status can be updated

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      setOperationLoading(true);
      setError(null);
      await TodoAPI.deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setOperationLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Calculate stats - FIXED: Use 'complete' property
  const completedCount = todos.filter(todo => todo.complete).length;
  const totalCount = todos.length;

  // Show loading spinner while initial load
  if (loading) {
    return <LoadingSpinner message="Loading your todos..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="font-black text-6xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            Turn Intentions into Actions
          </h1>
          <h2 className="font-black text-4xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            One Task at a Time
          </h2>
          <p className="text-xl text-gray-400 font-medium italic max-w-2xl mx-auto">
            Stay focused. Stay organized. Stay unstoppable.
          </p>
          
          <ProgressStats completedCount={completedCount} totalCount={totalCount} />
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={fetchTodos}
          />
        )}

        {/* Add Todo Form */}
        <AddTodoForm onAdd={addTodo} isLoading={operationLoading} />

        {/* Todo List - FIXED: Pass correct props */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <EmptyState />
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo} // Pass the entire todo object
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                isUpdating={operationLoading}
                // Removed onEdit since API doesn't support text editing
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        <ProgressStats completedCount={completedCount} totalCount={totalCount} />
      </div>
    </div>
  );
};

export default Todo;