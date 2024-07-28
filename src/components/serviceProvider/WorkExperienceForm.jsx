import React, { useState } from "react";
import "./WorkExperienceForm.scss";

const WorkExperienceForm = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, company: "", role: "", years: "" },
  ]);

  const handleChange = (id, event) => {
    const newExperiences = experiences.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [event.target.name]: event.target.value };
      }
      return exp;
    });
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { id: experiences.length + 1, company: "", role: "", years: "" },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Experiences:", experiences);
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
        {experiences.map((exp) => (
          <div key={exp.id} className="experience">
            <h3>Experience {exp.id}</h3>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(event) => handleChange(exp.id, event)}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(event) => handleChange(exp.id, event)}
            />
            <input
              type="number"
              name="years"
              placeholder="Years of Experience"
              value={exp.years}
              onChange={(event) => handleChange(exp.id, event)}
            />
          </div>
        ))}
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default WorkExperienceForm;
