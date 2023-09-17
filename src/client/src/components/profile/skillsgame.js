import React, { useState } from 'react';
import skillsData from './skills.json';

function SkillsComponent() {
  const categories = skillsData.categories;
  const [skillsBalance, setSkillsBalance] = useState({});

  const handleSkillSelect = (category, skill, mode) => {
    setSkillsBalance((prevSkillsBalance) => ({
      ...prevSkillsBalance,
      [category]: {
        ...(prevSkillsBalance[category] || {}),
        [skill]: mode,
      },
    }));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-4">Skills Balance Sheet</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.category_name} className="p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              {category.category_name}
            </h2>
            <ul>
              {category.skills.map((skill) => (
                <li key={skill} className="flex justify-between items-center mb-1">
                  <span className="text-gray-400">{skill}</span>
                  <select 
                    onChange={(e) => handleSkillSelect(category.category_name, skill, e.target.value)} 
                    value={skillsBalance[category.category_name]?.[skill] || "None"}
                  >
                    <option value="None">None</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Learning">Learning</option>
                  </select>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <strong>Your Selected Skills:</strong>
              <ul className="list-disc list-inside">
                {Object.entries(skillsBalance[category.category_name] || {}).map(([skill, mode]) => (
                  <li key={skill} className=" mt-1">
                    {skill}: {mode}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsComponent;
