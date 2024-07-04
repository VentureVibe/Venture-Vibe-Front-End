import React, { useState } from 'react';
import "./SidebarTravelPlan.scss";
import SidebarTravelPlanExtend from '../sidebarTravelPlanExtend/SidebarTravelPlanExtend';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const SidebarTravelPlan = () => {
  const overview = ["Explore", "Notes", "Hotels and Logging", "Places to visit", "Restaurants", "Activities"];
  const itinerary = ["Sun 1/6", "Mon 2/6", "Tue 3/6", "Wed 4/6", "Thu 5/6", "Fri 6/6", "Sat 7/6"];
  const budget = ["view"];

  // Initialize all sections to true
  const [openSections, setOpenSections] = useState({
    overview: true,
    itinerary: true,
    budget: true,
  });

  const toggleSection = (section) => {
    setOpenSections(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  return (
    <div className='sidebar'>
      <div className='container'>
        <div className='sidebar-item-tab'>
          <div className='sidebar-item-select' onClick={() => toggleSection('overview')}>
            {openSections['overview'] && <i><KeyboardArrowDownOutlinedIcon /></i>}
            {!openSections['overview'] && <i><KeyboardArrowRightOutlinedIcon /></i>}
            <span>Overview</span>
          </div>
          {openSections['overview'] && <SidebarTravelPlanExtend items={overview} />}
        </div>
        <div className='sidebar-item-tab'>
          <div className='sidebar-item-select' onClick={() => toggleSection('itinerary')}>
            {openSections['itinerary'] && <i><KeyboardArrowDownOutlinedIcon /></i>}
            {!openSections['itinerary'] && <i><KeyboardArrowRightOutlinedIcon /></i>}
            <span>Itinerary</span>
          </div>
          {openSections['itinerary'] && <SidebarTravelPlanExtend items={itinerary} />}
        </div>
        <div className='sidebar-item-tab'>
          <div className='sidebar-item-select' onClick={() => toggleSection('budget')}>
            {openSections['budget'] && <i><KeyboardArrowDownOutlinedIcon /></i>}
            {!openSections['budget'] && <i><KeyboardArrowRightOutlinedIcon /></i>}
            <span>Budget</span>
          </div>
          {openSections['budget'] && <SidebarTravelPlanExtend items={budget} />}
        </div>
      </div>
    </div>
  );
}

export default SidebarTravelPlan;
