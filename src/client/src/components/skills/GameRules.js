import React from 'react';

function GameRules() {
  return (
    <div className="bg-gray-900 p-8 rounded-xl shadow-2xl text-white space-y-6">
        <h2 className="text-3xl font-extrabold border-b-2 pb-4 border-gray-700">Game Rules</h2>
        <p className="text-gray-400 mb-6 leading-relaxed text-lg">
            Welcome to the Skill Balance Game! This game is all about recognizing and categorizing your skills. Are you an expert in a particular skill and can teach others? Or are you eager to learn a new skill?
        </p>
        <div className="flex items-center mb-6 space-x-4">
            <div className="bg-green-700 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold px-2">T</span>
            </div>
            <p className="text-gray-400 flex-grow text-lg">
                <strong>Teaching Points:</strong> For every skill you can teach, you earn points. These points are a testament to your expertise and your ability to share knowledge with others. Each skill you categorize as "Teaching" earns you 5 points.
            </p>
        </div>
        <div className="flex items-center mb-6 space-x-4">
            <div className="bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold px-2">L</span>
            </div>
            <p className="text-gray-400 flex-grow text-lg">
                <strong>Learning Points:</strong> For every skill you wish to learn, you earn points. These points reflect your dedication to personal growth and continuous learning. Each skill you categorize as "Learning" earns you 3 points.
            </p>
        </div>
        <p className="text-gray-400 leading-relaxed text-lg">
            The goal is to achieve a balance between the skills you can teach and the skills you wish to learn. As you progress, you'll attain different titles based on your points, ranging from "Complete N00b of N00bs" to "Supreme Master of All Skills". So, are you ready to embark on this journey of self-improvement and discovery?
        </p>
    </div>
  );
}

export default GameRules;
