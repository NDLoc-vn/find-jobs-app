import { predefinedSkills } from '@/app/lib/data';
import React, { useState } from 'react';

type SkillsFormProps = {
  skills: string[];
  inputValue: string;
  handleSkillsInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addSkill: (skill: string) => void;
};

const SkillsForm: React.FC<SkillsFormProps> = ({ skills, inputValue, handleSkillsInputChange, addSkill }) => {
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);

  const filteredSkills = predefinedSkills
    .filter(skill => !skills.includes(skill))
    .filter(skill => skill.toLowerCase().includes(inputValue.toLowerCase()));

  const skillsToShow = showAllSkills ? filteredSkills : filteredSkills.slice(0, 20);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills
      </label>
      <input
        type="text"
        name="skills"
        value={inputValue}
        placeholder="Điền kỹ năng"
        onChange={handleSkillsInputChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="mt-2">
        {skillsToShow.map((skill) => (
          <span
            key={skill}
            onClick={() => addSkill(skill)}
            className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer mr-2 mb-2"
          >
            {skill}
          </span>
        ))}
        {filteredSkills.length > 5 && (
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="mt-2 text-blue-500"
          >
            {showAllSkills ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Skills của tôi:</h3>
        <div>
          {skills.map((skill, index) => (
            <span
              key={index}
              onClick={() => addSkill(skill)}
              className="inline-block bg-blue-200 text-blue-700 px-3 py-1 rounded-full cursor-pointer mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;