import React from "react";
import "./ContentOversight.scss";

const ContentOversight = () => {
  return (
    <div className="content-oversight">
      <h1>Content Oversight</h1>
      <div className="content-list">
        {/* Example content items */}
        <div className="content-item">
          <h2>Article Title</h2>
          <p>Author: John Doe</p>
          <p>Status: Pending Review</p>
          <button className="approve-btn">Approve</button>
          <button className="reject-btn">Reject</button>
        </div>
        <div className="content-item">
          <h2>Travel Guide</h2>
          <p>Author: Jane Smith</p>
          <p>Status: Approved</p>
          <button className="reject-btn">Reject</button>
        </div>
        {/* Add more content items as needed */}
      </div>
    </div>
  );
};

export default ContentOversight;
