import React, { useState, useEffect } from 'react';
import * as SkillsAPI from './SkillsAPI';

const SkillsController = () => {
  const [skillsToTeach, setSkillsToTeach] = useState([]);
  const [skillsToLearn, setSkillsToLearn] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [skillCategory, setSkillCategory] = useState('');
  const authToken = localStorage.getItem('authToken');

  const syncSkills = async () => {
    try {
      const data = await SkillsAPI.fetchSkills(authToken);
      setSkillsToTeach(data.skillsToTeach);
      setSkillsToLearn(data.skillsToLearn);
    } catch (error) {
      console.error('Error syncing user skills:', error);
    }
  };

  useEffect(() => {
    syncSkills();
  }, [authToken]);

  const addSkillToServer = async (type) => {
    try {
      const data = await SkillsAPI.addSkill(authToken, newSkill, skillCategory);
      const updatedSkills = type === 'toTeach' ? [...skillsToTeach, data._id] : [...skillsToLearn, data._id];
      await SkillsAPI.updateSkills(authToken, updatedSkills, type);
      syncSkills();
      setNewSkill('');
      setSkillCategory('');
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const deleteSkillFromServer = async (skillId, type) => {
    try {
      await SkillsAPI.deleteSkill(authToken, skillId);
      const updatedSkills = (type === 'toTeach' ? skillsToTeach : skillsToLearn).filter(id => id !== skillId);
      await SkillsAPI.updateSkills(authToken, updatedSkills, type);
      syncSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <div>
      <h3>Your Skills to Teach</h3>
      <ul>
        {skillsToTeach.map((skillId, index) => (
          <li key={index}>
            {skillId} <button onClick={() => deleteSkillFromServer(skillId, 'toTeach')}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Your Skills to Learn</h3>
      <ul>
        {skillsToLearn.map((skillId, index) => (
          <li key={index}>
            {skillId} <button onClick={() => deleteSkillFromServer(skillId, 'toLearn')}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="New Skill"
      />
      <input
        type="text"
        value={skillCategory}
        onChange={(e) => setSkillCategory(e.target.value)}
        placeholder="Category"
      />
      <button onClick={() => addSkillToServer('toTeach')}>Add Skill to Teach</button>
      <button onClick={() => addSkillToServer('toLearn')}>Add Skill to Learn</button>
    </div>
  );
};

export default SkillsController;
