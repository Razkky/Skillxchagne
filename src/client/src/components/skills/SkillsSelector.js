import React, { useState, useCallback, useEffect } from 'react';
import skilldata from './skills.json';

function SkillsSelectorGrid({ userProfile, setUserProfile }) {
  const REACT_BASE_URL = process.env.REACT_APP_BASE_URL;
  const categories = skilldata.categories;
const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  // Define CSS classes for skill modes
  const skillClasses = {
    Learning: 'skill-learning',
    Teaching: 'skill-teaching',
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


  const getSkillMode = (skill, skillsToLearn, skillsToTeach) => {
    if (skillsToLearn.includes(skill)) return 'Learning';
    if (skillsToTeach.includes(skill)) return 'Teaching';
    return 'None';
  };

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

  const [searchInput, setSearchInput] = useState(''); // State to track user input
  const [selectedSkillsToLearn, setSelectedSkillsToLearn] = useState([]); // State to track selected skills to learn
  const [selectedSkillsToTeach, setSelectedSkillsToTeach] = useState([]); // State to track selected skills to teach

  useEffect(() => {
    // Initialize selected skills with already added skills
    const alreadyLearningAndTeachingSkills = [
      ...userProfile.skillsToLearn,
      ...userProfile.skillsToTeach,
    ];

    // Separate selected skills into "Skills to Learn" and "Skills to Teach"
    const skillsToLearn = alreadyLearningAndTeachingSkills.filter(skill =>
      userProfile.skillsToLearn.includes(skill)
    );
    const skillsToTeach = alreadyLearningAndTeachingSkills.filter(skill =>
      userProfile.skillsToTeach.includes(skill)
    );

    setSelectedSkillsToLearn(skillsToLearn);
    setSelectedSkillsToTeach(skillsToTeach);
  }, [userProfile.skillsToLearn, userProfile.skillsToTeach]);

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

    // Separate selected skills into "Skills to Learn" and "Skills to Teach" based on user selection
    const selectedSkillsLearn = selectedSkillsToLearn.filter((selectedSkill) =>
      selectedSkill !== skill
    );
    const selectedSkillsTeach = selectedSkillsToTeach.filter((selectedSkill) =>
      selectedSkill !== skill
    );

    if (mode === 'Learning') {
      setSelectedSkillsToLearn([...selectedSkillsLearn, skill]);
    } else if (mode === 'Teaching') {
      setSelectedSkillsToTeach([...selectedSkillsTeach, skill]);
    }

    // Automatically save changes to the server
    saveChangesToServer(newSkillsBalance);
  };

  const saveChangesToServer = (newSkillsBalance) => {
    const { updatedSkillsToTeach, updatedSkillsToLearn } = getUpdatedSkills(newSkillsBalance);
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
    <div className="bg-gray-100 text-gray-900 p-6 rounded-xl shadow-2xl">
      <div className="my-4">
        <p className="text-lg font-semibold mb-2">Selected Skills to Learn:</p>
        <div className="flex flex-wrap gap-2">
          {selectedSkillsToLearn.length === 0 && (
            <p className="text-gray-400">No skills selected</p>
          )}
          {selectedSkillsToLearn.map((selectedSkill) => (
            <div
              key={selectedSkill}
              className={`bg-blue-700 text-white p-1 rounded-md flex items-center space-x-2`}
            >
              <span>{selectedSkill}</span>
              <button
                onClick={() =>
                  handleSkillSelect(
                    categories.find((category) =>
                      category.skills.includes(selectedSkill)
                    ).category_name,
                    selectedSkill,
                    'None'
                  )
                }
                className="text-red-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="my-4">
        <p className="text-lg font-semibold mb-2">Selected Skills to Teach:</p>
        <div className="flex flex-wrap gap-2">
          {selectedSkillsToTeach.length === 0 && (
            <p className="text-gray-400">No skills selected</p>
          )}
          {selectedSkillsToTeach.map((selectedSkill) => (
            <div
              key={selectedSkill}
              className={`bg-green-500 text-white p-1 rounded-md flex items-center space-x-2`}
            >
              <span>{selectedSkill}</span>
              <button
                onClick={() =>
                  handleSkillSelect(
                    categories.find((category) =>
                      category.skills.includes(selectedSkill)
                    ).category_name,
                    selectedSkill,
                    'None'
                  )
                }
                className="text-red-500 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

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
                <li
                  key={skill}
                  className={`flex justify-between items-center mb-3 p-3 border-b border-gray-200 ${
                    skillClasses[skillsBalance[category.category_name]?.[skill]] || ''
                  }`}
                >
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
    </div>
  );
}

export default SkillsSelectorGrid;
