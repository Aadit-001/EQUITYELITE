import React from 'react';

export function LoadingCard() {
  return (
    <div className="p-4 w-11/12 h-60 group transition-transform transform duration-300 ease-in-out animate-pulse">
      <div className="bg-[#131213] h-full shadow-lg rounded-lg overflow-hidden flex">
        <figure className="w-1/3 h-full p-2 flex justify-center items-center bg-gray-700">
          <div className="w-full h-full bg-gray-600 rounded-md"></div>
        </figure>
        <div className="p-6 w-2/3 flex flex-col">
          <div className="h-10 bg-gray-600 mb-2 rounded-md"></div>
          <div className="h-8 bg-gray-600 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
