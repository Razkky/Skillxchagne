
import React, { useState, useEffect } from 'react';
import SkillsController from '../skills/skills';
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'; // Import icons for skills

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

async function getUserProfile() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No token found');
    return null;
  }

  const response = await fetch(`${REACT_APP_BASE_URL}/api/user/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    console.error('Unauthorized');
    return null;
  }

  if (!response.ok) {
    console.error('Server error:', response.status);
    return null;
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    return null;
  }
}


function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const profileData = await getUserProfile();
      setLoading(false);
      if (profileData) {
        setUserProfile(profileData);
      }
    })();
  }, []);

  return (
    <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {loading ? (
        <p className="text-center">Loading user profile...</p>
      ) : userProfile ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p className="mb-4">
            <span className="font-semibold">Full Name:</span> {userProfile.profile.fullName}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {userProfile.email}
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex items-center mb-2">
              <FaBook className="text-blue-500 mr-2" /> {/* Book icon */}
              <span className="font-semibold">Skills to Learn:</span>
            </div>
            <SkillsController skills={userProfile.skillsToLearn} /> {/* Pass skills data */}
          </div>
          <div>
            <div className="flex items-center mb-2">
              <FaChalkboardTeacher className="text-green-500 mr-2" /> {/* Teacher icon */}
              <span className="font-semibold">Skills to Teach:</span>
            </div>
            <SkillsController skills={userProfile.skillsToTeach} /> {/* Pass skills data */}
          </div>
        </div>
      ) : (
        <p className="text-center">No user profile data available.</p>
      )}
    </div>
  );
}

export default UserProfile;
