import "./storyDiv.scss";
import React from "react";

const StoryDiv = () => {
  return (
    <div className="story-div" >


      <div className="left-story-div">
        <div className="column">
          <img src="/src/assets/homepage/beach.jpeg" />
          <img src="/src/assets/homepage/fishc.jpeg" />
        </div>
        <div className="column">
          <img src="/src/assets/homepage/tot.jpg" />
          <img src="/src/assets/homepage/NAB.jpg" />
        </div>
      </div>
      <div className="right-story-div">
        <p className="head">OUR SHORT STORY</p>
        <p className="para">
          Our aim is to make global corporate travel management more
          <br />
          personalized and seamless. We achieve this through a network of
          <br />
          exceptional local agencies that are leaders in their respective
          <br />
          markets. By combining local expertise with global reach, we ensure
          <br />
          that your business travel is efficient, cost-effective, and tailored
          <br />
          to meet your unique needs.
        </p>
        {/* <button>See More</button> */}
      </div>
    </div>
  );
};

export default StoryDiv;
