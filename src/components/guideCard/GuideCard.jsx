import React from "react";
import "./GuideCard.scss";
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";

const GuideCard = ({
  img,
  name,
  price,
  id,
  location,
  contactNumber,
  rating,
}) => {
  return (
    <div className="guide">
      <Link to={`/guideprofile`}>
        <div className="body-container">
          <img src={img} alt={name} />
          <span className="title">{name}</span>
          <div className="rating">
            <i>
              <StarRateIcon sx={{ color: "#414143", fontSize: 15 }} />
            </i>
            <i>
              <StarRateIcon sx={{ color: "#414143", fontSize: 15 }} />
            </i>
            <i>
              <StarRateIcon sx={{ color: "#414143", fontSize: 15 }} />
            </i>
            <i>
              <StarRateIcon sx={{ color: "#414143", fontSize: 15 }} />
            </i>
          </div>
          <span className="location">Location : {location}</span>
          <span className="price">{price}$</span>
          <span className="contactNumber">{contactNumber}</span>
        </div>
      </Link>
    </div>
  );
};

export default GuideCard;
