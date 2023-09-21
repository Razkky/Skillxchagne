import React from 'react';

function GameRules() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-6 shadow-md text-white">
      <h2 className="text-2xl mb-4 font-bold border-b pb-2 border-gray-700">Game Legend</h2>
      <p className="text-gray-400 mb-4 leading-relaxed">
        Welcome to the Skill Balance Game! In this engaging challenge, you have the power to categorize your skills into two distinct domains: "Teaching" and "Learning."
      </p>
      <div className="flex items-center mb-4">
        <div className="bg-green-600 w-6 h-6 mr-3 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold px-2">T</span>
        </div>
        <p className="text-gray-400 flex-grow">
          <strong>Teaching Points:</strong> Earn these points by selecting skills as "Teaching." Showcase your ability to educate others.
        </p>
      </div>
      <div className="flex items-center mb-4">
        <div className="bg-blue-600 w-6 h-6 mr-3 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-semibold px-2">L</span>
        </div>
        <p className="text-gray-400 flex-grow">
          <strong>Learning Points:</strong> Accumulate these points by designating skills as "Learning." Demonstrate your dedication to acquiring new knowledge and skills.
        </p>
      </div>
      <p className="text-gray-400 leading-relaxed">
        Strive for balance! Achieving equilibrium between these two categories will mold you into a well-rounded individual, proficient in both teaching and learning. Embrace the journey of self-improvement!
      </p>
    </div>
  );
}

export default GameRules;
