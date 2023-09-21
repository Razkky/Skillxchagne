import React, { useState, useEffect } from 'react';
import SkillsComponent from '../skills/SkillsComponent';
import Matching from '../matching/matching';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

async function fetchUserProfile() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return { error: 'No token found' };
  }

  try {
    const response = await fetch(`${REACT_APP_BASE_URL}/api/user/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errData = await response.json();
      return { error: errData.message || response.statusText };
    }
    return await response.json();
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
}

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = async () => {
      const profileData = await fetchUserProfile();
      if (profileData.error) {
        setError(profileData.error);
      } else {
        setUserProfile(profileData);
      }
      setLoading(false);
    };

    loadUserProfile();
  }, []);
  

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 min-h-screen flex flex-col items-center justify-center text-white">
         {loading && <p className="text-blue-400 font-semibold text-lg mt-4">Loading user profile...</p>}
        {error && <p className="text-red-400 font-semibold text-lg">Error: {error}</p>}
        {userProfile && (
            <SkillsComponent userProfile={userProfile} setUserProfile={setUserProfile} />
        )}

      <Matching />
    </div>
  );
}

export default UserProfile;
