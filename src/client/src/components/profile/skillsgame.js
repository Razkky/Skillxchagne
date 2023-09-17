import React, { useState, useEffect } from 'react';
import skillsData from './skills.json';

function SkillsComponent() {
  const categories = skillsData.categories;
  const [skillsBalance, setSkillsBalance] = useState({});
  const [mixedSelectedSkills, setMixedSelectedSkills] = useState([]);
  const [teachingPoints, setTeachingPoints] = useState(0);
  const [learningPoints, setLearningPoints] = useState(0);

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

  return (
    <div className="container mx-auto mt-10">
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white p-5 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-4 font-semibold">Skills Balance Sheet</h1>
      <div className="flex space-x-4 mb-4">
        <span className="bg-green-700 text-white py-2 px-4 rounded-full">
          Teaching Points: {teachingPoints}
        </span>
        <span className="bg-blue-700 text-white py-2 px-4 rounded-full">
          Learning Points: {learningPoints}
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
        <h2 className="text-xl mb-2 font-semibold">Game Legend</h2>
        <p className="text-gray-300">
          In this game, you can allocate skills into two categories: Teaching and Learning.
        </p>
        <p className="text-gray-300 mt-2">
          - Teaching Points are earned when you select a skill as "Teaching". These points represent
          your ability to teach others.
        </p>
        <p className="text-gray-300 mt-2">
          - Learning Points are earned when you select a skill as "Learning". These points indicate
          your dedication to acquiring new knowledge and skills.
        </p>
        <p className="text-gray-300 mt-2">
          Balancing these points helps you become a well-rounded individual with expertise in both
          teaching and learning.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.category_name} className="p-4 rounded-lg shadow-md group hover:bg-gray-600 transition duration-300">
            <h2 className="text-xl mb-2 font-semibold cursor-pointer"
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
                    onChange={(e) => handleSkillSelect(category.category_name, skill, e.target.value)}
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
