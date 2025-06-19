import React from 'react';

const ProgressStats = ({ completedCount, totalCount }) => {
  return (
    <>
      {/* Progress indicator */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-gray-700/50">
          <span className="text-lg font-bold text-gray-200">
            {completedCount} of {totalCount} completed
          </span>
        </div>
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500"
            style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* Footer Stats */}
      {totalCount > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-700/50">
            <div className="text-3xl font-bold text-blue-400">{totalCount}</div>
            <div className="text-gray-400 font-medium">Total Tasks</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-700/50">
            <div className="text-3xl font-bold text-emerald-400">{completedCount}</div>
            <div className="text-gray-400 font-medium">Completed</div>
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-gray-700/50">
            <div className="text-3xl font-bold text-purple-400">{totalCount - completedCount}</div>
            <div className="text-gray-400 font-medium">Remaining</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressStats;