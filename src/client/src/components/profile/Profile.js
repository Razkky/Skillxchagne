import React, { useState, useEffect } from 'react';
import SkillsComponent from './skillsgame';

const NODE_BASE_URL = process.env.NODE_BASE_URL;

async function getUserProfile() {
  console.log('Getting user profile');
  const token = localStorage.getItem('authToken');
  console.log('Token', token);
  if (!token) {
    console.error('No token found');
    return null;
  }
  console.log(`logging url${NODE_BASE_URL}/api/user/`)

  const response = await fetch('http://localhost:5001/api/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  console.log('Response gotten', response);
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
    <div className="shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
    text-white">
      {loading ? (
        <p className="text-center text-gray-100">Loading user profile...</p>
      ) : userProfile ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-100">User Profile</h2>
          <p className="mb-4 text-gray-200">
            <span className="font-semibold text-gray-100">Full Name:</span> {userProfile.profile.fullName}
          </p>
          <p className="mb-4 text-gray-200">
            <span className="font-semibold text-gray-100">Email:</span> {userProfile.email}
          </p>
          <div className="mb-4">
            <SkillsComponent />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">No user profile data available.</p>
      )}
    </div>
  );
}

export default UserProfile;
