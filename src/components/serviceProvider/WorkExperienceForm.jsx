// import React, { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import "./WorkExperienceForm.scss";

// const WorkExperienceForm = ({ setWorkExperiences, onNext }) => {
//   const [experiences, setExperiences] = useState([
//     { companyName: "", role: "", yearsOfExperience: "" },
//   ]);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const newExperiences = experiences.map((exp, i) => {
//       if (i === index) {
//         return { ...exp, [name]: value };
//       }
//       return exp;
//     });
//     setExperiences(newExperiences);
//   };

//   const addExperience = () => {
//     setExperiences([
//       ...experiences,
//       { companyName: "", role: "", yearsOfExperience: "" },
//     ]);
//   };

//   const deleteExperience = (index) => {
//     const newExperiences = experiences.filter((_, i) => i !== index);
//     setExperiences(newExperiences);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setWorkExperiences(experiences);
//     onNext();
//   };

//   return (
//     <form className="WorkExperienceForm" onSubmit={handleSubmit}>
//       <div className="header">
//         <h2>Guide Registration</h2>
//         <button type="button" onClick={addExperience}>
//           Add Experience
//         </button>
//       </div>
//       <div className="experience-container">
//         {experiences.map((exp, index) => (
//           <div key={index} className="experience">
//             <div className="experience-header">
//               <h3>Experience {index + 1}</h3>
//               <button
//                 type="button"
//                 className="delete-button"
//                 onClick={() => deleteExperience(index)}
//               >
//                 <DeleteIcon />
//               </button>
//             </div>
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company Name"
//               value={exp.companyName}
//               onChange={(event) => handleChange(index, event)}
//             />
//             <input
//               type="text"
//               name="role"
//               placeholder="Role"
//               value={exp.role}
//               onChange={(event) => handleChange(index, event)}
//             />
//             <input
//               type="number"
//               name="yearsOfExperience"
//               placeholder="Years of Experience"
//               value={exp.yearsOfExperience}
//               onChange={(event) => handleChange(index, event)}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="submit">Next</button>
//     </form>
//   );
// };

// export default WorkExperienceForm;

import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./WorkExperienceForm.scss";

const WorkExperienceForm = ({ setWorkExperiences, onNext }) => {
  const [experiences, setExperiences] = useState([
    { companyName: "", role: "", yearsOfExperience: "" },
  ]);
  const [specialties, setSpecialties] = useState([]);
  const [languages, setLanguages] = useState([]);

  const specialtiesOptions = [
    "Urban Tours",
    "Historical Sites",
    "Nature Walks",
    "Adventure Tours",
    "Cultural Experiences",
    "Food Tours",
    "Wildlife Safaris",
    "Photography Tours",
  ];

  const languagesOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Russian",
    "Arabic",
  ];

  const handleExperienceChange = (index, event) => {
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

  const handleSpecialtiesChange = (e) => {
    const value = e.target.value;
    if (value && !specialties.includes(value)) {
      setSpecialties([...specialties, value]);
    }
  };

  const handleLanguagesChange = (e) => {
    const value = e.target.value;
    if (value && !languages.includes(value)) {
      setLanguages([...languages, value]);
    }
  };

  const removeSpecialty = (specialty) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const removeLanguage = (language) => {
    setLanguages(languages.filter((l) => l !== language));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWorkExperiences({ experiences, specialties, languages });
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
              onChange={(event) => handleExperienceChange(index, event)}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={exp.role}
              onChange={(event) => handleExperienceChange(index, event)}
            />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              value={exp.yearsOfExperience}
              onChange={(event) => handleExperienceChange(index, event)}
            />
          </div>
        ))}
      </div>
      <div className="form-group">
        <label htmlFor="specialties">Specialties</label>
        <div className="select-container">
          <select id="specialties" value="" onChange={handleSpecialtiesChange}>
            <option value="" disabled>
              Select specialties
            </option>
            {specialtiesOptions.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
        <div className="selected-items">
          {specialties.map((specialty, index) => (
            <div key={index} className="selected-item">
              {specialty}
              <button type="button" onClick={() => removeSpecialty(specialty)}>
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="languages">Languages</label>
        <div className="select-container">
          <select id="languages" value="" onChange={handleLanguagesChange}>
            <option value="" disabled>
              Select languages
            </option>
            {languagesOptions.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="selected-items">
          {languages.map((language, index) => (
            <div key={index} className="selected-item">
              {language}
              <button type="button" onClick={() => removeLanguage(language)}>
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default WorkExperienceForm;
