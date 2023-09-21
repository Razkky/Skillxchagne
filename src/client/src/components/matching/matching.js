import React, { useState, useEffect } from "react";
import {
  calculateScore,
  getLearningLevelName,
  getTeachingLevelName,
} from '../skills/levels';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function UserCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-800 font-semibold text-lg flex flex-col space-y-4 hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300">
      <h2 className="text-3xl">{user.fullName}</h2>
      <p className="text-gray-600">{user.email}</p>
  
      {/* Learning Information */}
      <div className="flex flex-col space-y-2">
         {user.learningPoints !== undefined ? (
          <>
            <div className="relative pt-1">  <p className="text-left text-gray-600">{user.learningLevel}</p>
             <div className="flex flex-row space-x-2 justify-between w-full">
             <p className="text-left text-gray-600">{user.learningPoints} Points</p>
            <p className="text-left text-gray-600">{((user.learningPoints / 256) * 100).toFixed(2)}%</p>
            </div>
          <div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                <div style={{ width: `${((user.learningPoints / 256) * 100).toFixed(2)}%` }} className="flex flex-col justify-center bg-blue-500"></div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-left text-gray-600">N/A</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-semibold text-left text-gray-700">Skills to Learn:</h3>
        <ul className="text-left list-disc list-inside text-gray-600">
          {user.skillsToLearn.map((skill, skillIndex) => (
            <li className="text-left list-disc list-inside text-sm" key={skillIndex}>{skill}</li>
          ))}
        </ul>
      </div>
  
      {/* Teaching Information */}
      <div className="flex flex-col space-y-2">
       <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-semibold text-left text-gray-700">Teaching Score:</h3>
        {user.teachingPoints !== undefined ? (
          <>
          <div className="relative pt-1">  <p className="text-left text-gray-600">{user.teachingLevel}</p>
           <div className="flex flex-row space-x-2 justify-between w-full">
           <p className="text-left text-gray-600">{user.teachingPoints} Points</p>
          <p className="text-left text-gray-600">{((user.teachingPoints / 256) * 100).toFixed(2)}%</p>
          </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-gren-200 rounded">
              <div style={{ width: `${((user.teachingPoints / 256) * 100).toFixed(2)}%` }} className="flex flex-col justify-center bg-green-500"></div>
            </div>
          </div>
        </>
        ) : (
          <p className="text-left text-gray-600">N/A</p>
        )}
      </div>
      </div>
  
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-semibold text-left text-gray-700">Skills to Teach:</h3>
        <ul className="text-left list-disc list-inside text-gray-600">
          {user.skillsToTeach.map((skill, skillIndex) => (
            <li key={skillIndex}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}

function Matching() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchMatchingUsers();
  }, []);

  async function fetchMatchingUsers() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/matches`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        const usersWithScoresAndLevels = data.map(user => {
          const { totalPoints, teachingPercentage, learningPercentage, teachingLevel, learningLevel, teachingPoints, learningPoints } = calculateScore(user.skillsToLearn, user.skillsToTeach);

          return {
            ...user,
            learningPoints,
            teachingPoints,
            learningLevel,
            teachingLevel,
            totalPoints,
            percentage: (totalPoints / 256) * 100,
          };
        });
        setMatchingUsers(usersWithScoresAndLevels);
      } else {
        setError('Failed to fetch matching users');
      }
    } catch (error) {
      setError('Error fetching matching users');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 bg-gradient-to-r from-blue-600/10 to-purple-600/20 text-white p-8  shadow-2xl">
      <h1 className="text-4xl font-extrabold text-gray-200">Matching Users</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 w-full">
        {matchingUsers.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={fetchMatchingUsers}
        disabled={isLoading}
      >
        Refresh Matched Users
      </button>
    </div>
  );
}

export default Matching;
