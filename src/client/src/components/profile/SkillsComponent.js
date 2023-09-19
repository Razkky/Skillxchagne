import skilldata from './skills.json';
import React, { useState, useCallback } from 'react';
import GameRules from './GameRules';
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

function GameHeader({ userProfile }) {
    const skillsToLearn = userProfile.skillsToLearn;
    const skillsToTeach = userProfile.skillsToTeach;
    const learningPoints = skillsToLearn.length * 3;
    const teachingPoints = skillsToTeach.length * 5;
    const getLevelName = (percentage) => {
        if (percentage >= 99) return 'Supreme Master of All Skills';
        if (percentage >= 98) return 'Grandmaster of Grandmasters';
        if (percentage >= 97) return 'Ultimate Sage';
        if (percentage >= 96) return 'Transcendent Virtuoso';
        if (percentage >= 95) return 'World-Class Virtuoso';
        if (percentage >= 94) return 'Legendary Virtuoso';
        if (percentage >= 93) return 'Master Virtuoso';
        if (percentage >= 92) return 'Grand Virtuoso';
        if (percentage >= 91) return 'Supreme Virtuoso';
        if (percentage >= 90) return 'Virtuoso';
        if (percentage >= 89) return 'Masterful Expert';
        if (percentage >= 88) return 'Exceptional Expert';
        if (percentage >= 87) return 'Distinguished Expert';
        if (percentage >= 86) return 'Outstanding Expert';
        if (percentage >= 85) return 'Advanced Expert';
        if (percentage >= 84) return 'Expert';
        if (percentage >= 83) return 'Grand Adept';
        if (percentage >= 82) return 'Supreme Adept';
        if (percentage >= 81) return 'Adept';
        if (percentage >= 80) return 'Masterful Pro';
        if (percentage >= 79) return 'Exceptional Pro';
        if (percentage >= 78) return 'Distinguished Pro';
        if (percentage >= 77) return 'Outstanding Pro';
        if (percentage >= 76) return 'Advanced Pro';
        if (percentage >= 75) return 'Pro';
        if (percentage >= 74) return 'Masterful Apprentice';
        if (percentage >= 73) return 'Exceptional Apprentice';
        if (percentage >= 72) return 'Distinguished Apprentice';
        if (percentage >= 71) return 'Outstanding Apprentice';
        if (percentage >= 70) return 'Advanced Apprentice';
        if (percentage >= 69) return 'Apprentice';
        if (percentage >= 68) return 'Competent Learner';
        if (percentage >= 67) return 'Adept Learner';
        if (percentage >= 66) return 'Skilled Learner';
        if (percentage >= 65) return 'Competent Learner';
        if (percentage >= 64) return 'Novice Learner';
        if (percentage >= 63) return 'Adept Novice';
        if (percentage >= 62) return 'Competent Novice';
        if (percentage >= 61) return 'Novice Novice';
        if (percentage >= 60) return 'Skilled Beginner';
        if (percentage >= 59) return 'Competent Beginner';
        if (percentage >= 58) return 'Novice Beginner';
        if (percentage >= 57) return 'Beginner';
        if (percentage >= 56) return 'N00vish Beginner';
        if (percentage >= 55) return 'Absolute Beginner';
        if (percentage >= 54) return 'Total N00b';
        if (percentage >= 53) return 'Complete N00b';
        if (percentage >= 52) return 'Ultimate N00b';
        if (percentage >= 51) return 'Supreme N00b';
        if (percentage >= 50) return 'N00b';
        if (percentage >= 49) return 'Almost N00b';
        if (percentage >= 48) return 'Initiate';
        if (percentage >= 47) return 'Inexperienced';
        if (percentage >= 46) return 'Amateur';
        if (percentage >= 45) return 'Total Newbie';
        if (percentage >= 44) return 'Rookie';
        if (percentage >= 43) return 'Unskilled';
        if (percentage >= 42) return 'Inept';
        if (percentage >= 41) return 'Clueless';
        if (percentage >= 40) return 'Absolute Newbie';
        if (percentage >= 39) return 'Neophyte';
        if (percentage >= 38) return 'Bumbler';
        if (percentage >= 37) return 'Novice Clod';
        if (percentage >= 36) return 'Beginner Bozo';
        if (percentage >= 35) return 'Complete Newbie';
        if (percentage >= 34) return 'Ignoramus';
        if (percentage >= 33) return 'Dunce';
        if (percentage >= 32) return 'Simpleton';
        if (percentage >= 31) return 'Foolish';
        if (percentage >= 30) return 'Ultimate Newbie';
        if (percentage >= 29) return 'Supreme Newbie';
        if (percentage >= 28) return 'Newbie';
        if (percentage >= 27) return 'Almost Newbie';
        if (percentage >= 26) return 'N00bish';
        if (percentage >= 25) return 'N00b';
        if (percentage >= 24) return 'Almost N00b';
        if (percentage >= 23) return 'N00b';
        if (percentage >= 22) return 'Extreme N00b';
        if (percentage >= 21) return 'Super N00b';
        if (percentage >= 20) return 'Total N00b';
        if (percentage >= 19) return 'Absolute N00b';
        if (percentage >= 18) return 'Complete N00b';
        if (percentage >= 17) return 'Ultimate N00b';
        if (percentage >= 16) return 'Supreme N00b';
        if (percentage >= 15) return 'N00b';
        if (percentage >= 14) return 'Almost N00b';
        if (percentage >= 13) return 'Initiate of N00bs';
        if (percentage >= 12) return 'Inexperienced N00b';
        if (percentage >= 11) return 'Amateur N00b';
        if (percentage >= 10) return 'Total N00b';
        if (percentage >= 9) return 'Rookie N00b';
        if (percentage >= 8) return 'Unskilled N00b';
        if (percentage >= 7) return 'Inept N00b';
        if (percentage >= 6) return 'Clueless N00b';
        if (percentage >= 5) return 'Absolute N00b';
        if (percentage >= 4) return 'Neophyte N00b';
        if (percentage >= 3) return 'Bumbler N00b';
        if (percentage >= 2) return 'Novice Clod N00b';
        if (percentage >= 1) return 'Beginner Bozo N00b';
        if (percentage >= 0) return 'Complete N00b of N00bs';
      };
      

    const teachingLevel = getLevelName((teachingPoints / 200) * 100);
    const learningLevel = getLevelName((learningPoints / 200) * 100);

    return (
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-6 rounded-lg
        hover:shadow-xl transition duration-300">

        <h1 className="text-4xl mb-6 font-bold border-b pb-2 border-gray-600
        text-center tracking-wide uppercase
        ">
          Skills X Change Game Profile
        </h1>
      
        <div className="space-y-4 text-center text-sm font-semibold">
          <div className="flex flex-wrap gap-3 justify-center items-center
            ">
            <div className="bg-green-800 flex items-center py-2 px-5 rounded-full shadow-md">
              <span className="mr-3 font-bold
              shadow-md rounded-full
              ">Teaching Points:</span>
              <span>
                {teachingPoints} ({((teachingPoints / 945) * 100).toFixed(2)}%) -{" "}
                {teachingLevel}
              </span>
            </div>
            <div className="bg-blue-800 flex items-center py-2 px-5 rounded-full shadow-md
            ">
              <span className="mr-3 font-bold
                shadow-md rounded-full
              ">Learning Points:</span>
              <span>
                {learningPoints} ({((learningPoints / 567) * 100).toFixed(2)}%) -{" "}
                {learningLevel}
              </span>
            </div>
          </div>
      
          <div className="flex flex-wrap gap-3 justify-center items-center">
  {skillsToTeach.map((skill, index) => (
    <span
      key={index}
      className="py-1 px-3 rounded-full text-sm font-semibold bg-green-700 hover:bg-green-800 transition duration-300"
    >
      {skill} (Teaching)
    </span>
  ))}
  {skillsToLearn.map((skill, index) => (
    <span
      key={index}
      className="py-1 px-3 rounded-full text-sm font-semibold bg-blue-700 hover:bg-blue-800 transition duration-300"
    >
      {skill} (Learning)
    </span>
  ))}
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
        <div className="bg-gradient-to-tr from-gray-100 via-gray-50 to-gray-200 p-6 rounded-lg shadow-md
        w-full min-w-full">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.category_name}
            className="bg-white rounded-lg shadow-lg group hover:shadow-xl transition duration-300"
          >
            <div
              onClick={() => toggleSkillsList(category.category_name)}
              onTouchStart={() => toggleSkillsList(category.category_name)}
              className="cursor-pointer hover:bg-gray-100 p-6"
            >
              <h2 className="text-2xl mb-4 font-bold text-gray-700">
                {category.category_name}
              </h2>
            </div>
            <ul
              className={`transition-all duration-300 overflow-hidden ${
                showSkills[category.category_name] ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex justify-between items-center mb-4 p-6"
                >
                  <span className="text-gray-600">{skill}</span>
                  <select
                    className="bg-gray-900 text-white rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        <div className="p-6 grid gap-4 bg-gradient-to-tr from-gray-100 via-gray-50 to-gray-200 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

        <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <div className="mb-6">
            <GameHeader userProfile={userProfile} className="text-2xl font-bold mb-4" />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition duration-300">
            <GameRules />
          </div>
        </div>
      
        <div className="col-span-3 p-4 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
          <GameScore userProfile={userProfile} setUserProfile={setUserProfile} />
        </div>
      
      </div>
      
    );
    
    
}

export default SkillsComponent;