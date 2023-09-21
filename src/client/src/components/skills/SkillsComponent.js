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


function SkillsComponent({ userProfile, setUserProfile }) {
    const categories = skilldata.categories;

    return (
      <>
          <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-500/10 to-purple-800/20 text-white p-8 rounded-xl shadow-2xl space-y-8">
              <GameHeader userProfile={userProfile} className="text-3xl font-extralight text-gray-900" />
              <GameRules className="text-gray-600 text-lg" />
          </div>
      </>
  );
  
    
}

export default SkillsComponent;