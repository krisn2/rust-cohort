import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      <AlertCircle className="w-6 h-6 text-red-400" />
      <h3 className="text-red-400 font-semibold">Connection Error</h3>
    </div>
    <p className="text-red-300 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
    >
      Retry
    </button>
  </div>
);

export default ErrorMessage;