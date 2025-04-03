import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="relative flex items-center justify-center mb-4">
        {/* Outer spinning ring */}
        <div className="absolute h-28 w-28 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent opacity-75"></div>
        {/* Inner pulsing element (e.g., Logo Placeholder) */}
        <div className="h-20 w-20 bg-gradient-to-tl from-blue-600 to-indigo-500 rounded-full animate-pulse flex items-center justify-center shadow-lg">
           <span className="text-3xl font-bold text-white">P</span> {/* Placeholder */}
        </div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-300 tracking-wider">Initializing Peermall...</p>
    </div>
  );
};

export default Preloader;
