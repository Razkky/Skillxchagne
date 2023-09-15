import React, { useState, useEffect } from 'react';
import SkillsController from './SkillsController'; // Import the SkillsController

async function getUserProfile() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error('No token found');
    return null;
  }

  const response = await fetch('/api/user/', {
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:max-w-md md:max-w-lg lg:max-w-xl">
      {loading ? (
        <p>Loading user profile...</p>
      ) : userProfile ? (
        <div>
          <h2>User Profile</h2>
          <p>Full Name: {userProfile.fullName}</p>
          <p>Email: {userProfile.email}</p>
          <SkillsController /> {/* Include the SkillsController */}
          {/* Display other user profile information here */}
        </div>
      ) : (
        <p>No user profile data available.</p>
      )}
    </div>
  );
}

export default UserProfile;
