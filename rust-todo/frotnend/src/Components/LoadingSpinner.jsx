import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
