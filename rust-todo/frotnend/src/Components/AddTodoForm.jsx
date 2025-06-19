import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

const AddTodoForm = ({ onAdd, isLoading }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = async () => {
    if (newTodo.trim()) {
      await onAdd(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyUp={handleKeyPress}
            placeholder="Add a new task..."
            disabled={isLoading}
            className="w-full px-6 py-4 text-lg bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 text-white disabled:opacity-50"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !newTodo.trim()}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl hover:from-blue-700 hover:to-purple-800 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;