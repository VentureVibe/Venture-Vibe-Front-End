// import "./Details.scss";
// import React from "react";
// import {
//   LocationOn,
//   AccessTime,
//   EmojiEvents,
//   Phone,
//   Email,
// } from "@mui/icons-material";

// const Details = ({ guide }) => {
//   return (
//     <div className="details-grid">
//       <div className="main-info card">
//         <div className="location">
//           <LocationOn />
//           <span>{guide.location}</span>
//         </div>

//         <div className="stats">
//           <div className="stat">
//             <AccessTime />
//             <div>
//               <p className="label">Experience</p>
//               <p className="value">{guide.experience}</p>
//             </div>
//           </div>
//           <div className="stat">
//             <EmojiEvents />
//             <div>
//               <p className="label">Rating</p>
//               <p className="value">
//                 {guide.rating} ({guide.reviews.length} reviews)
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="specialties">
//           <h3>Specialties</h3>
//           <div className="tags">
//             {guide.specialties.map((specialty) => (
//               <span key={specialty} className="tag">
//                 {specialty}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="languages">
//           <h3>Languages</h3>
//           <div className="tags">
//             {guide.languages.map((language) => (
//               <span key={language} className="tag">
//                 {language}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="contact-info card">
//         <div className="price">
//           <p className="amount">${guide.price}</p>
//           <p className="period">per day</p>
//         </div>

//         <div className="contacts">
//           <div className="contact">
//             <Phone />
//             <span>{guide.phone}</span>
//           </div>
//           <div className="contact">
//             <Email />
//             <span>{guide.email}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;

import "./Details.scss";
import React from "react";
import {
  LocationOn,
  AccessTime,
  EmojiEvents,
  Phone,
  Email,
} from "@mui/icons-material";

const Details = ({ guide }) => {
  if (!guide) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-grid">
      <div className="main-info card">
        <div className="location">
          <LocationOn />
          <span>{guide.location}</span>
        </div>

        <div className="stats">
          <div className="stat">
            <AccessTime />
            <div>
              <p className="label">Experience</p>
              <p className="value">{guide.experience}</p>
            </div>
          </div>
          <div className="stat">
            <EmojiEvents />
            <div>
              <p className="label">Rating</p>
              <p className="value">
                {guide.rating} ({guide.reviews.length} reviews)
              </p>
            </div>
          </div>
        </div>

        <div className="specialties">
          <h3>Specialties</h3>
          <div className="tags">
            {guide.specialties.map((specialty) => (
              <span key={specialty} className="tag">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="languages">
          <h3>Languages</h3>
          <div className="tags">
            {guide.languages.map((language) => (
              <span key={language} className="tag">
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-info card">
        <div className="price">
          <p className="amount">${guide.price}</p>
          <p className="period">per day</p>
        </div>

        <div className="contacts">
          <div className="contact">
            <Phone />
            <span>{guide.phone}</span>
          </div>
          <div className="contact">
            <Email />
            <span>{guide.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
