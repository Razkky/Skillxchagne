import skilldata from './skills.json';
import React, { useState, useCallback } from 'react';
import GameRules from './GameRules';
import {calculateScore, getLearningLevelName,getTeachingLevelName } from './levels';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;


function GameHeader({ userProfile }) {
    const fullName = userProfile.profile.fullName;
    const skillsToLearn = userProfile.skillsToLearn || [];
    const skillsToTeach = userProfile.skillsToTeach || [];

    const score = calculateScore(skillsToLearn, skillsToTeach);
    const learningPoints = score.learningPoints;
    const teachingPoints = score.teachingPoints;
    const learningLevel = getLearningLevelName(learningPoints);
    const teachingLevel = getTeachingLevelName(teachingPoints);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-800 font-semibold text-lg flex flex-col space-y-4 w-full hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-3xl">{fullName}</h2>
          <p className="text-gray-600">{userProfile.profile.email}</p>
         {/* Skills Cloud */}
         <div className="flex flex-col space-y-2">
            <h3 className="text-2xl font-semibold text-left text-gray-700">Skills Cloud:</h3>
            <div className="flex flex-wrap space-x-2">
              {skillsToLearn.map((skill, skillIndex) => (
                <span className="px-3 py-1 bg-blue-600 rounded-full text-white text-sm m-1" key={skillIndex}>
                  {skill} (Learning)
                </span>
              ))}
              {skillsToTeach.map((skill, skillIndex) => (
                <span className="px-3 py-1 bg-green-700 rounded-full text-white text-sm m-1" key={skillIndex}>
                  {skill} (Teaching)
                </span>
              ))}
            </div>
          </div>
          {/* Learning Information */}
          <div className="flex flex-col space-y-2">
            {learningPoints !== undefined ? (
              <>
                <div className="relative pt-1">
                  <p className="text-left text-gray-600">{learningLevel}</p>
                  <div className="flex flex-row space-x-2 justify-between w-full">
                    <p className="text-left text-gray-600">{learningPoints} Points</p>
                    <p className="text-left text-gray-600">{((learningPoints / 256) * 100).toFixed(2)}%</p>
                  </div>
                  <div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                    <div style={{ width: `${((learningPoints / 256) * 100).toFixed(2)}%` }} className="flex flex-col justify-center bg-blue-500"></div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-left text-gray-600">N/A</p>
            )}
          </div>
      
       
      
          {/* Teaching Information */}
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              {teachingPoints !== undefined ? (
                <>
                  <div className="relative pt-1">
                    <p className="text-left text-gray-600">{teachingLevel}</p>
                    <div className="flex flex-row space-x-2 justify-between w-full">
                      <p className="text-left text-gray-600">{teachingPoints} Points</p>
                      <p className="text-left text-gray-600">{((teachingPoints / 256) * 100).toFixed(2)}%</p>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-green-200 rounded">
                      <div style={{ width: `${((teachingPoints / 256) * 100).toFixed(2)}%` }} className="flex flex-col justify-center bg-green-500"></div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-left text-gray-600">N/A</p>
              )}
            </div>
          </div>
        </div>
      );
      
}
function GameScore({ userProfile, setUserProfile }) {
    const REACT_BASE_URL = process.env.REACT_APP_BASE_URL;
    const categories = skilldata.categories;
    const getSkillMode = (skill, skillsToLearn, skillsToTeach) => {
        if (skillsToLearn.includes(skill)) return 'Learning';
        if (skillsToTeach.includes(skill)) return 'Teaching';
        return 'None';
    };
    // Move initSkillsBalance above its usage
    const initSkillsBalance = useCallback(() => {
        const skillsBalance = {};

        for (const category of categories) {
            skillsBalance[category.category_name] = {};

            for (const skill of category.skills) {
                const mode = getSkillMode(skill, userProfile.skillsToLearn, userProfile.skillsToTeach);
                skillsBalance[category.category_name][skill] = mode;
            }
        }

        return skillsBalance;
    }, [categories, userProfile]);

    const [skillsBalance, setSkillsBalance] = useState(initSkillsBalance);
    const [showSkills, setShowSkills] = useState(
        categories.reduce((acc, category) => ({ ...acc, [category.category_name]: false }), {})
    );

    const [error, setError] = useState(null); // Define the error state
    const [loading, setLoading] = useState(false); // Define the loading state

    // Helper function to determine skill mode (None, Learning, or Teaching)
   

    // Handler for toggling the display of skills in a category
    const toggleSkillsList = (categoryName) => {
        setShowSkills({ ...showSkills, [categoryName]: !showSkills[categoryName] });
    };

    const getUpdatedSkills = (balance) => {
        const updatedSkillsToTeach = [];
        const updatedSkillsToLearn = [];

        for (const [category, skills] of Object.entries(balance)) {
            for (const [skill, skillMode] of Object.entries(skills)) {
                if (skillMode === 'Teaching') updatedSkillsToTeach.push(skill);
                if (skillMode === 'Learning') updatedSkillsToLearn.push(skill);
            }
        }

        return { updatedSkillsToTeach, updatedSkillsToLearn };
    };

    const handleSkillSelect = (category, skill, mode) => {
        const newSkillsBalance = {
            ...skillsBalance,
            [category]: {
                ...skillsBalance[category],
                [skill]: mode,
            },
        };

        setSkillsBalance(newSkillsBalance);
    };

    const handleSaveChanges = () => {
        const { updatedSkillsToTeach, updatedSkillsToLearn } = getUpdatedSkills(skillsBalance);
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found');
            return;
        }

        setLoading(true); // Set loading state to true

        fetch(`${REACT_BASE_URL}/api/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                skillsToTeach: updatedSkillsToTeach,
                skillsToLearn: updatedSkillsToLearn,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update user skills');
                }
            })
            .then((data) => {
                console.log('User skills updated successfully:', data);
                // Update the user profile after successfully saving changes
                updateUserProfile();
            })
            .catch((error) => {
                console.error('Error updating skills:', error);
                setError(error); // Set the error state
            })
            .finally(() => {
                setLoading(false); // Set loading state to false
            });
    };

    const updateUserProfile = async () => {
        const profileData = await fetchUserProfile();
        if (profileData.error) {
            setError(profileData.error);
        } else {
            setUserProfile(profileData);
        }
    };

    async function fetchUserProfile() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return { error: 'No token found' };
        }

        try {
            const response = await fetch(`${REACT_BASE_URL}/api/user/`, {
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

    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {categories.map((category) => (
                  <div
                      key={category.category_name}
                      className="bg-white rounded-xl shadow-md group hover:shadow-2xl transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                      onClick={() => toggleSkillsList(category.category_name)}
                      onMouseEnter={() => setShowSkills({ ...showSkills, [category.category_name]: true })}
                        onMouseLeave={() => setShowSkills({ ...showSkills, [category.category_name]: false })}
                        
                  >
                      <div className="p-4">
                          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                              {category.category_name}
                          </h2>
                      </div>
                      <ul
                          className={`transition-all duration-300 overflow-hidden ${
                              showSkills[category.category_name] ? 'max-h-[1000px]' : 'max-h-0'
                          }`}
                      >
                          {category.skills.map((skill) => (
                              <li key={skill} className="flex justify-between items-center mb-3 p-3 border-b border-gray-200">
                                  <span className="text-gray-700 text-lg">{skill}</span>
                                  <select
                                      className="bg-gray-900 text-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      onChange={(e) =>
                                          handleSkillSelect(category.category_name, skill, e.target.value)
                                      }
                                      value={skillsBalance[category.category_name]?.[skill] || 'None'}
                                  >
                                      <option value="None">None</option>
                                      <option value="Teaching">Teaching</option>
                                      <option value="Learning">Learning</option>
                                  </select>
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
          <div className="flex justify-center w-full mt-6">
              <button
                  onClick={handleSaveChanges}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                  Save Changes
              </button>
          </div>
      </div>
  );
  
}

function SkillsComponent({ userProfile, setUserProfile }) {
    const categories = skilldata.categories;

    return (
      <>
          <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-500/10 to-purple-800/20 text-white p-8 rounded-xl shadow-2xl space-y-8">
              <GameHeader userProfile={userProfile} className="text-3xl font-extralight text-gray-900" />
              <GameRules className="text-gray-600 text-lg" />
          </div>
          <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r  from-blue-500/10 to-purple-800/20 text-white p-8 rounded-xl shadow-2xl space-y-8">
                 <GameScore userProfile={userProfile} setUserProfile={setUserProfile} className="p-8 rounded-xl shadow-2xl" />
          </div>
      </>
  );
  
    
}

export default SkillsComponent;