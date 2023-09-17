// SkillsController.js
import React, { useState, useEffect } from 'react';

const SkillsController = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // Fetch skills from the server or local storage
  useEffect(() => {
    // Replace this with API call to fetch user skills
    const storedSkills = localStorage.getItem('userSkills');
    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }
  }, []);

  const addSkill = () => {
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);

      // Replace this with API call to update user skills
      localStorage.setItem('userSkills', JSON.stringify(updatedSkills));

      setNewSkill('');
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);

    // Replace this with API call to update user skills
    localStorage.setItem('userSkills', JSON.stringify(updatedSkills));
  };

  return (
    <div>
      <h3>Your Skills</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            {skill} <button onClick={() => deleteSkill(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="New Skill"
      />
      <button onClick={addSkill}>Add Skill</button>
    </div>
  );
};

export default SkillsController;
