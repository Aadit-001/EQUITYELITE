import React from 'react';

export function LoadingCard() {
  return (
    <div className="group relative h-full overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-500/30 hover:shadow-purple-500/10 animate-pulse">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gray-800/50">
        <div className="w-full h-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-700/50 rounded-md mb-3 w-3/4"></div>
        
        {/* Summary Skeleton */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-700/50 rounded w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700/50 rounded w-4/6"></div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-800 mt-4">
          <div className="h-4 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full w-1/3"></div>
          
          <div className="flex space-x-2">
            <div className="w-7 h-7 bg-gray-700/50 rounded-lg"></div>
            <div className="w-7 h-7 bg-gray-700/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
