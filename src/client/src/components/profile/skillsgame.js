import React, { useState, useEffect } from 'react';
import skillsData from './skills.json';

function SkillsComponent() {
  const categories = skillsData.categories;
  const [skillsBalance, setSkillsBalance] = useState({});
  const [mixedSelectedSkills, setMixedSelectedSkills] = useState([]);
  const [teachingPoints, setTeachingPoints] = useState(0);
  const [learningPoints, setLearningPoints] = useState(0);
  const [maxTeachingPoints] = useState(945); // Set the maximum teaching points
  const [maxLearningPoints] = useState(567); // Set the maximum learning points
  const [powerUpAnimation, setPowerUpAnimation] = useState(false);

  useEffect(() => {
    updatePointsAndSkills();
  }, [skillsBalance]);

  const updatePointsAndSkills = () => {
    let mixedSkills = [];
    let teaching = 0;
    let learning = 0;
    for (const [category, skills] of Object.entries(skillsBalance)) {
      for (const [skill, mode] of Object.entries(skills)) {
        mixedSkills.push({ category, skill, mode });
        if (mode === 'Teaching') {
          teaching += 5;
        } else if (mode === 'Learning') {
          learning += 3;
        }
      }
    }
    setMixedSelectedSkills(mixedSkills);
    setTeachingPoints(teaching);
    setLearningPoints(learning);
    // Trigger the power-up animation
    setPowerUpAnimation(true);
    // Reset the power-up animation after a delay (e.g., 1 second)
    setTimeout(() => {
      setPowerUpAnimation(false);
    }, 1000);
  };

  const handleSkillSelect = (category, skill, mode) => {
    setSkillsBalance((prevSkillsBalance) => ({
      ...prevSkillsBalance,
      [category]: {
        ...(prevSkillsBalance[category] || {}),
        [skill]: mode,
      },
    }));
    updatePointsAndSkills();
  };

  const toggleSkillsList = (e) => {
    const nextSibling = e.currentTarget.nextElementSibling;
    if (nextSibling) {
      nextSibling.classList.toggle('hidden');
    }
  };

  // Calculate the percentage of skill completion for both teaching and learning
  const teachingPercentage = (teachingPoints / maxTeachingPoints) * 100;
  const learningPercentage = (learningPoints / maxLearningPoints) * 100;

  // Define funny level names based on the percentages
  const teachingLevel = getLevelName(teachingPercentage);
  const learningLevel = getLevelName(learningPercentage);

  // Function to determine level name based on percentage
  function getLevelName(percentage) {
    if (percentage >= 90) {
      return 'Master';
    } else if (percentage >= 70) {
      return 'Guru';
    } else if (percentage >= 50) {
      return 'Wizard';
    } else if (percentage >= 30) {
      return 'Novice';
    } else {
      return 'N00b';
    }
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl mb-4 font-semibold">Skills X Change Game Profile</h1>
        <div className="flex space-x-4 mb-4">
          <span className={`bg-green-700 text-white py-2 px-4 rounded-full ${powerUpAnimation ? 'power-up-animation' : ''}`}>
            Teaching Points: {teachingPoints} ({teachingPercentage.toFixed(2)}%) - {teachingLevel}
          </span>
          <span className={`bg-blue-700 text-white py-2 px-4 rounded-full ${powerUpAnimation ? 'power-up-animation' : ''}`}>
            Learning Points: {learningPoints} ({learningPercentage.toFixed(2)}%) - {learningLevel}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {mixedSelectedSkills.map(({ skill, mode }, index) => (
            <span
              key={index}
              className={`py-1 px-3 rounded-full text-sm font-semibold ${
                mode === 'Teaching' ? 'bg-green-600' : 'bg-blue-600'
              }`}
            >
              {skill} ({mode})
            </span>
          ))}
        </div>
        {/* Game Legend Card */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
  <h2 className="text-xl mb-2 font-semibold text-white">Game Legend</h2>
  <p className="text-gray-300 mb-2">
    Welcome to the Skill Balance Game! In this engaging challenge, you have the power to categorize your skills into two distinct domains: "Teaching" and "Learning."
  </p>
  <div className="flex items-center mb-2">
    <div className="bg-green-600 w-4 h-4 mr-2 rounded-full"></div>
    <p className="text-gray-300">Teaching Points: Earn these points by selecting skills as "Teaching." Showcase your ability to educate others.</p>
  </div>
  <div className="flex items-center mb-2">
    <div className="bg-blue-600 w-4 h-4 mr-2 rounded-full"></div>
    <p className="text-gray-300">Learning Points: Accumulate these points by designating skills as "Learning." Demonstrate your dedication to acquiring new knowledge and skills.</p>
  </div>
  <p className="text-gray-300">
    Strive for balance! Achieving equilibrium between these two categories will mold you into a well-rounded individual, proficient in both teaching and learning. Embrace the journey of self-improvement!
  </p>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.category_name}
              className="p-4 rounded-lg shadow-md group hover:bg-gray-600 transition duration-300"
            >
              <h2
                className="text-xl mb-2 font-semibold cursor-pointer"
                onMouseEnter={toggleSkillsList}
                onMouseLeave={toggleSkillsList}
                onFocus={toggleSkillsList}
                onBlur={toggleSkillsList}
              >
                {category.category_name}
              </h2>
              <ul className="hidden group-hover:block">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex justify-between items-center mb-2">
                    <span>{skill}</span>
                    <select
                      className="bg-gray-800 text-white rounded"
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
    </div>
  );
}

export default SkillsComponent;
