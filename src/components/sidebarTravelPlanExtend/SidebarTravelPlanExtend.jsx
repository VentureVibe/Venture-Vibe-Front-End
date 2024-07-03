import React from 'react';
import "./SidebarTravelPlanExtend.scss";

const SidebarTravelPlanExtend = ({ items }) => {
  return (
    <div className='sidebarTravelPlanOverview'>
      <div className='container'>
        {items.map((item, index) => (
          <div key={index} className='sidebar-item-overview'>
            <a href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}>
              <span>{item}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarTravelPlanExtend;
