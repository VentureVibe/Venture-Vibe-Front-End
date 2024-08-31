// import React, { useState } from "react";
// import "./RegistrationPersonalInfo.scss";

// const RegistrationPersonalInfo = () => {
//   const [dob, setDob] = useState({
//     day: "",
//     month: "",
//     year: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDob((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="RegistrationPersonalInfo">
//       <div className="name">
//         <div className="firstname">
//           <p>First Name</p>
//           <input type="text" />
//         </div>
//         <div className="lastname">
//           <p>Last Name</p>
//           <input type="text" />
//         </div>
//       </div>
//       <div className="bday">
//         <p>Birth Day</p>
//         <div className="input">
//           <input
//             type="text"
//             name="day"
//             value={dob.day}
//             placeholder="DD"
//             maxLength="2"
//             onChange={handleChange}
//           />
//           <span></span>
//           <input
//             type="text"
//             name="month"
//             value={dob.month}
//             placeholder="MM"
//             maxLength="2"
//             onChange={handleChange}
//           />
//           <span></span>
//           <input
//             type="text"
//             name="year"
//             value={dob.year}
//             placeholder="YYYY"
//             maxLength="4"
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//       <div className="contact">
//         <p>Contact No</p>
//         <input type="text" />
//       </div>
//       <div className="email">
//         <p>Email </p>
//         <input type="text" />
//       </div>

//       <div className="next">
//         <button>Next</button>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPersonalInfo;

// import React, { useState } from "react";
// import "./RegistrationPersonalInfo.scss";

// const RegistrationPersonalInfo = ({ setUserDetails, onNext }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     dob: {
//       day: "",
//       month: "",
//       year: "",
//     },
//     contactNumber: "",
//     email: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleDobChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       dob: {
//         ...prevState.dob,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = () => {
//     setUserDetails(formData);
//     onNext();
//   };

//   return (
//     <div className="RegistrationPersonalInfo">
//       <div className="name">
//         <div className="firstname">
//           <p>First Name</p>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="lastname">
//           <p>Last Name</p>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </div>
//       </div>
//       <div className="bday">
//         <p>Birth Day</p>
//         <div className="input">
//           <input
//             type="text"
//             name="day"
//             value={formData.dob.day}
//             placeholder="DD"
//             maxLength="2"
//             onChange={handleDobChange}
//           />
//           <span></span>
//           <input
//             type="text"
//             name="month"
//             value={formData.dob.month}
//             placeholder="MM"
//             maxLength="2"
//             onChange={handleDobChange}
//           />
//           <span></span>
//           <input
//             type="text"
//             name="year"
//             value={formData.dob.year}
//             placeholder="YYYY"
//             maxLength="4"
//             onChange={handleDobChange}
//           />
//         </div>
//       </div>
//       <div className="contact">
//         <p>Contact No</p>
//         <input
//           type="text"
//           name="contactNumber"
//           value={formData.contactNumber}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="email">
//         <p>Email </p>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="next">
//         <button onClick={handleSubmit}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default RegistrationPersonalInfo;

import React, { useState, useEffect } from "react";
import "./RegistrationPersonalInfo.scss";

const RegistrationPersonalInfo = ({ setUserDetails, onNext }) => {
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDob((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleNext = () => {
    setUserDetails({
      firstName,
      lastName,
      contactNumber,
      email,
      dob: `${dob.year}-${dob.month}-${dob.day}`,
      location,
    });
    onNext();
  };

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 6.927079, lng: 79.861244 },
        zoom: 8,
      });
      const marker = new window.google.maps.Marker({
        position: map.getCenter(),
        map,
        draggable: true,
      });
      setLocation({
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
      });
      marker.addListener("dragend", (event) => {
        setLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    }
  }, []);

  return (
    <div className="registration-personal-info-container">
      <div className="registration-personal-info">
        {/* <h2>Personal Information</h2> */}
        <div className="form-container">
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <div className="dob-inputs">
                <input
                  type="text"
                  name="day"
                  value={dob.day}
                  placeholder="DD"
                  maxLength="2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="month"
                  value={dob.month}
                  placeholder="MM"
                  maxLength="2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="year"
                  value={dob.year}
                  placeholder="YYYY"
                  maxLength="4"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="map-section">
            <label>Select Your Location</label>
            <div id="map" className="map-container"></div>
          </div>
        </div>
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RegistrationPersonalInfo;
