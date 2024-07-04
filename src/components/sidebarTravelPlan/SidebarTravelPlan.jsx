import React, { useState, useEffect } from 'react';
import "./SidebarTravelPlan.scss";
import SidebarTravelPlanExtend from '../sidebarTravelPlanExtend/SidebarTravelPlanExtend';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const SidebarTravelPlan = ({from, to}) => {
  const overview = ["Explore", "Notes", "Hotels and Logging", "Places to visit", "Restaurants", "Activities"];
  const budget = ["view"];
  
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    const generateItinerary = (fromDate, toDate) => {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      const tempItinerary = [];

      let currentDate = startDate;
      while (currentDate <= endDate) {
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const formattedDate = `${dayOfWeek} ${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
        tempItinerary.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return tempItinerary;
    };

    setItinerary(generateItinerary(from, to));
  }, [from, to]);

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
