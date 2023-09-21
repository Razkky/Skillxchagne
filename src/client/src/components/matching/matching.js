import React, { useState, useEffect } from "react";

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function Matching() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchMatchingUsers();
  }, []);

  async function fetchMatchingUsers() {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/api/matches`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = await response.json();
        setMatchingUsers(data);
      } else {
        console.error('Failed to fetch matching users');
      }
    } catch (error) {
      console.error('Error fetching matching users:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold m-4">Matching Users</h1>
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-3">
        {matchingUsers.map((user, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center text-gray-800 font-semibold text-lg mb-4  flex flex-col"
          >
            <h2 className="text-2xl mb-4">{user.fullName}</h2>
            <p className="mb-4">{user.email}</p>
            <div className="flex flex-col">
              <h3 className="text-xl mb-2 font-semibold text-left">Skills to Learn:</h3>
              <ul className="mb-4 text-left list-disc list-inside">
                {user.skillsToLearn.map((skill, skillIndex) => (
                  <li className="mb-1 text-left list-disc list-inside text-sm" key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl mb-2 font-semibold text-left">Skills to Teach:</h3>
              <ul className="mb-4 text-left list-disc list-inside">
                {user.skillsToTeach.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={fetchMatchingUsers}
      >
        Update Matched Users
      </button>
    </div>
  );
}

export default Matching;
