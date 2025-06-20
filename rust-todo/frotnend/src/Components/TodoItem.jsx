import React from 'react';
import { Trash2, CheckCircle2, Circle, Loader2 } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, isUpdating }) => {
  return (
    <div className="group bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:shadow-xl hover:bg-gray-800/80 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            disabled={isUpdating}
            className="transition-all duration-300 hover:scale-110 disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
            ) : todo.complete ? ( // FIXED: Use 'complete' not 'completed'
              <CheckCircle2 className="w-6 h-6 text-emerald-500 hover:text-emerald-400" />
            ) : (
              <Circle className="w-6 h-6 text-gray-500 hover:text-blue-400" />
            )}
          </button>
          
          <p className={`font-medium text-lg transition-all duration-300 ${
            todo.complete // FIXED: Use 'complete' not 'completed'
              ? 'text-gray-500 line-through'
              : 'text-gray-200 group-hover:text-white'
          }`}>
            {todo.todo || 'Untitled Task'} {/* FIXED: Use 'todo' property */}
          </p>
        </div>
        
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* REMOVED: Edit button since API doesn't support text editing */}
          <button
            onClick={() => onDelete(todo.id)}
            disabled={isUpdating}
            className="p-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem