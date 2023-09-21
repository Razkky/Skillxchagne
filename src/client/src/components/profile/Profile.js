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
                'Authorization': `Bearer ${token}`
            }
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
      <>
        <div className="bg-base-100 p-6 rounded-lg shadow-md">
          {loading && (
            <div className="mb-4 text-center">
              <p className="text-blue-600 font-semibold mt-4">Loading user profile...</p>
            </div>
          )}
    
          {error && (
            <div className="mb-4 text-center">
              <p className="text-red-600 font-semibold">Error: {error}</p>
            </div>
          )}
    
          {userProfile && (
            <div>
              <h2 className="text-2xl font-bold text-base mb-4">User Profile</h2>
              <div className="mb-4">
                <p className="text-base font-semibold">Email: {userProfile.email}</p>
                <p className="text-base font-semibold">Name: {userProfile.profile.fullName}</p>
              </div>
              <SkillsComponent userProfile={userProfile} setUserProfile={setUserProfile} />
            </div>
          )}
        </div>
    
        <Matching className="hidden sm:block" />
      </>
    );
    
      
      
}

export default UserProfile;
