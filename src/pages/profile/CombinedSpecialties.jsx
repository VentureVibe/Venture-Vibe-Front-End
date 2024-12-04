// import React, { useState } from "react";
// import axios from "axios";
// import "./CombinedSpecialties.scss";

// const CombinedSpecialties = ({
//   guide,
//   onUpdateGuide,
//   specialtiesOptions,
//   languagesOptions,
// }) => {
//   const [specialties, setSpecialties] = useState(guide.specialties);
//   const [newSpecialty, setNewSpecialty] = useState("");
//   const [languages, setLanguages] = useState(guide.languages);
//   const [newLanguage, setNewLanguage] = useState("");
//   const [experiences, setExperiences] = useState(guide.experiences);
//   const [newExperience, setNewExperience] = useState({
//     companyName: "",
//     role: "",
//     yearsOfExperience: "",
//   });

//   const handleAddSpecialty = () => {
//     if (newSpecialty && !specialties.includes(newSpecialty)) {
//       setSpecialties([...specialties, newSpecialty]);
//       setNewSpecialty("");
//     }
//   };

//   const handleRemoveSpecialty = (specialty) => {
//     setSpecialties(specialties.filter((s) => s !== specialty));
//   };

//   const handleAddLanguage = () => {
//     if (newLanguage && !languages.includes(newLanguage)) {
//       setLanguages([...languages, newLanguage]);
//       setNewLanguage("");
//     }
//   };

//   const handleRemoveLanguage = (language) => {
//     setLanguages(languages.filter((l) => l !== language));
//   };

//   const handleAddExperience = () => {
//     if (
//       newExperience.companyName &&
//       newExperience.role &&
//       newExperience.yearsOfExperience
//     ) {
//       setExperiences([...experiences, newExperience]);
//       setNewExperience({ companyName: "", role: "", yearsOfExperience: "" });
//     }
//   };

//   const handleRemoveExperience = (experience) => {
//     setExperiences(experiences.filter((exp) => exp !== experience));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedGuide = { ...guide, specialties, languages, experiences };

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/api/v1/serviceProvider/update-travel-guide`,
//         updatedGuide
//       );
//       onUpdateGuide(response.data);
//     } catch (error) {
//       console.error("Error updating guide information:", error);
//       alert("Failed to update guide information.");
//     }
//   };

//   return (
//     <form className="combined-specialties card" onSubmit={handleSubmit}>
//       <div className="specialties-languages">
//         <div className="specialties-section">
//           <h3>Edit Specialties</h3>
//           <div className="form-group">
//             <label>New Specialty</label>
//             <select
//               value={newSpecialty}
//               onChange={(e) => setNewSpecialty(e.target.value)}
//             >
//               <option value="">Select a specialty</option>
//               {specialtiesOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button type="button" onClick={handleAddSpecialty}>
//               Add
//             </button>
//           </div>
//           <div className="specialties-list">
//             {specialties.map((specialty) => (
//               <div key={specialty} className="specialty">
//                 <span>{specialty}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveSpecialty(specialty)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="languages-section">
//           <h3>Edit Languages</h3>
//           <div className="form-group">
//             <label>New Language</label>
//             <select
//               value={newLanguage}
//               onChange={(e) => setNewLanguage(e.target.value)}
//             >
//               <option value="">Select a language</option>
//               {languagesOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             <button type="button" onClick={handleAddLanguage}>
//               Add
//             </button>
//           </div>
//           <div className="languages-list">
//             {languages.map((language) => (
//               <div key={language} className="language">
//                 <span>{language}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveLanguage(language)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="experiences-section">
//         <h3>Edit Experiences</h3>
//         <div className="form-group">
//           <label>Company Name</label>
//           <input
//             type="text"
//             value={newExperience.companyName}
//             onChange={(e) =>
//               setNewExperience({
//                 ...newExperience,
//                 companyName: e.target.value,
//               })
//             }
//           />
//         </div>
//         <div className="form-group">
//           <label>Role</label>
//           <input
//             type="text"
//             value={newExperience.role}
//             onChange={(e) =>
//               setNewExperience({ ...newExperience, role: e.target.value })
//             }
//           />
//         </div>
//         <div className="form-group">
//           <label>Years of Experience</label>
//           <input
//             type="number"
//             value={newExperience.yearsOfExperience}
//             onChange={(e) =>
//               setNewExperience({
//                 ...newExperience,
//                 yearsOfExperience: e.target.value,
//               })
//             }
//           />
//         </div>
//         <button type="button" onClick={handleAddExperience}>
//           Add Experience
//         </button>
//         <div className="experiences-list">
//           {experiences.map((experience, index) => (
//             <div key={index} className="experience">
//               <div>
//                 <strong>Company:</strong> {experience.companyName}
//               </div>
//               <div>
//                 <strong>Role:</strong> {experience.role}
//               </div>
//               <div>
//                 <strong>Years:</strong> {experience.yearsOfExperience}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveExperience(experience)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button type="submit" className="save-button">
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default CombinedSpecialties;

import React, { useState } from "react";
import axios from "axios";
import "./CombinedSpecialties.scss";

const CombinedSpecialties = ({
  guide,
  onUpdateGuide,
  specialtiesOptions,
  languagesOptions,
}) => {
  const [specialties, setSpecialties] = useState(guide.specialties);
  const [newSpecialty, setNewSpecialty] = useState("");
  const [languages, setLanguages] = useState(guide.languages);
  const [newLanguage, setNewLanguage] = useState("");
  const [experiences, setExperiences] = useState(guide.experiences);
  const [newExperience, setNewExperience] = useState({
    companyName: "",
    role: "",
    yearsOfExperience: "",
  });

  const handleAddSpecialty = () => {
    if (newSpecialty && !specialties.includes(newSpecialty)) {
      setSpecialties([...specialties, newSpecialty]);
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty) => {
    setSpecialties(specialties.filter((s) => s !== specialty));
  };

  const handleAddLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage)) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (language) => {
    setLanguages(languages.filter((l) => l !== language));
  };

  const handleAddExperience = () => {
    if (
      newExperience.companyName &&
      newExperience.role &&
      newExperience.yearsOfExperience
    ) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ companyName: "", role: "", yearsOfExperience: "" });
    }
  };

  const handleRemoveExperience = (experience) => {
    setExperiences(experiences.filter((exp) => exp !== experience));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGuide = { ...guide, specialties, languages, experiences };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/serviceProvider/update-travel-guide`,
        updatedGuide
      );
      onUpdateGuide(response.data);
    } catch (error) {
      console.error("Error updating guide information:", error);
      alert("Failed to update guide information.");
    }
  };

  return (
    <form className="combined-specialties card" onSubmit={handleSubmit}>
      <div className="specialties-languages">
        <div className="specialties-section">
          <h3>Edit Specialties</h3>
          <div className="form-group">
            <label>New Specialty</label>
            <select
              value={newSpecialty}
              onChange={(e) => setNewSpecialty(e.target.value)}
            >
              <option value="">Select a specialty</option>
              {specialtiesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddSpecialty}>
              Add
            </button>
          </div>
          <div className="specialties-list">
            {specialties.map((specialty) => (
              <div key={specialty} className="specialty">
                <span>{specialty}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSpecialty(specialty)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="languages-section">
          <h3>Edit Languages</h3>
          <div className="form-group">
            <label>New Language</label>
            <select
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
            >
              <option value="">Select a language</option>
              {languagesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleAddLanguage}>
              Add
            </button>
          </div>
          <div className="languages-list">
            {languages.map((language) => (
              <div key={language} className="language">
                <span>{language}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(language)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="experiences-section">
        <div className="experiences-form">
          <h3>Edit Experiences</h3>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={newExperience.companyName}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  companyName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={newExperience.role}
              onChange={(e) =>
                setNewExperience({ ...newExperience, role: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              value={newExperience.yearsOfExperience}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  yearsOfExperience: e.target.value,
                })
              }
            />
          </div>
          <button
            type="button"
            className="add-experience-button"
            onClick={handleAddExperience}
          >
            Add Experience
          </button>
        </div>
        <div className="experiences-list">
          {experiences.map((experience, index) => (
            <div key={index} className="experience">
              <div>
                <strong>Company:</strong> {experience.companyName}
              </div>
              <div>
                <strong>Role:</strong> {experience.role}
              </div>
              <div>
                <strong>Years:</strong> {experience.yearsOfExperience}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExperience(experience)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="save-button">
        Save Changes
      </button>
    </form>
  );
};

export default CombinedSpecialties;
