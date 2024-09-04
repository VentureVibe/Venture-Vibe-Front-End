import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./WorkExperienceForm.scss";

const WorkExperienceForm = ({ setWorkExperiences, onNext }) => {
  const [experiences, setExperiences] = useState([
    { companyName: "", role: "", yearsOfExperience: "" },
  ]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newExperiences = experiences.map((exp, i) => {
      if (i === index) {
        return { ...exp, [name]: value };
      }
      return exp;
    });
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { companyName: "", role: "", yearsOfExperience: "" },
    ]);
  };

  const deleteExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWorkExperiences(experiences);
    onNext();
  };

  return (
    <form className="WorkExperienceForm" onSubmit={handleSubmit}>
      <div className="header">
        <h2>Guide Registration</h2>
        <button type="button" onClick={addExperience}>
          Add Experience
        </button>
      </div>
      <div className="experience-container">
        {experiences.map((exp, index) => (
          <div key={index} className="experience">
            <div className="experience-header">
              <h3>Experience {index + 1}</h3>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteExperience(index)}
              >
                <DeleteIcon />
              </button>
            </div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={exp.companyName}
              onChange={(event) => handleChange(index, event)}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(event) => handleChange(index, event)}
            />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              value={exp.yearsOfExperience}
              onChange={(event) => handleChange(index, event)}
            />
          </div>
        ))}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default WorkExperienceForm;
