import React from 'react';

const DataLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="relative w-48 h-48">
        {/* Central Orb */}
        <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-purple-500"></div>

        {/* Ring 1 - Fast, Blue Orbiter */}
        <div
          className="absolute inset-0 m-auto w-10 h-10 rounded-full border-2 border-blue-500 animate-spin"
          style={{
            animationDuration: '1.5s',
            transform: 'translateX(25%) translateY(-25%) rotate(0deg)',
          }}
        ></div>

        {/* Ring 2 - Medium, Pink Orbiter */}
        <div
          className="absolute inset-0 m-auto w-16 h-16 rounded-full border-2 border-pink-500 animate-spin"
          style={{
            animationDuration: '2.5s',
            transform: 'translateX(-30%) translateY(30%) rotate(0deg)',
          }}
        ></div>
        
        {/* Ring 3 - Slow, Green Orbiter */}
        <div
          className="absolute inset-0 m-auto w-24 h-24 rounded-full border-2 border-green-500 animate-spin"
          style={{
            animationDuration: '4s',
            transform: 'translateX(40%) translateY(40%) rotate(0deg)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default DataLoader;