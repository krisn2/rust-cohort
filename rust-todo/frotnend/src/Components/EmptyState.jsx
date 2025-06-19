import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
      <CheckCircle2 className="w-12 h-12 text-gray-400" />
    </div>
    <p className="text-xl text-gray-400 font-medium">No tasks yet. Add one above!</p>
  </div>
);

export default EmptyState;