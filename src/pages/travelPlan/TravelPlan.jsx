import React, { useState } from 'react';
import "./TravelPlan.scss";
import NavbarTravelplan from '../../components/navbarTravelplan/NavbarTravelplan';
import SidebarTravelPlan from '../../components/sidebarTravelPlan/SidebarTravelPlan';
import galle from '../../assets/galle.jpg';
import TripToTravelPlan from '../../components/tripToTravelPlan/TripToTravelPlan';
import ExploreTravelPlan from '../../components/exploreTravelPlan/ExploreTravelPlan';
import map from '../../assets/map.png';
import NotesTravelPlan from '../../components/notesTravelPlan/NotesTravelPlan';
import HotelsTravelPlan from '../../components/hotelsTravelPlan/HotelsTravelPlan';
import PlacesToVisitTravelPlan from '../../components/placesToVisitTravelPlan/PlacesToVisitTravelPlan';
import RestaurantsTravelPlan from '../../components/restaurantsTravelPlan/RestaurantsTravelPlan';
import EventsTravelPlan from '../../components/eventsTravelPlan/EventsTravelPlan';
import TransportTravelPlan from '../../components/transportTravelPlan/TransportTravelPlan';

const TravelPlan = () => {
  const [sidebarTop, setSidebarTop] = useState(50); // Initial top position of the sidebar

  const handleMouseMove = (event) => {
    const sidebar = event.currentTarget;
    const rect = sidebar.getBoundingClientRect();
    const offsetY = event.clientY - rect.top;

    setSidebarTop(event.clientY - offsetY);
  };

  return (
    <div className='trvelplan'>
      <div className='container'>
        <div className='planning'>
          <NavbarTravelplan />
          <hr />
          <div className='plan-container'>
            <div
              className="plan-sidebar"
              style={{ top: `${sidebarTop}px` }}
              onMouseMove={handleMouseMove}
            >
              <SidebarTravelPlan />
            </div>
            <div className='plan-list-container'>
              <div className='plan-list'>
                <img src={galle} alt="Galle" />
                <TripToTravelPlan />
              </div>
              <ExploreTravelPlan />
              <NotesTravelPlan />
              <hr />
              <HotelsTravelPlan />
              <hr />
              <PlacesToVisitTravelPlan />
              <hr />
              <RestaurantsTravelPlan />
              <hr />
              <EventsTravelPlan />
              <hr />
              <TransportTravelPlan />
            </div>
          </div>
        </div>
        <div className='map'>
          <img src={map} alt="Map" />
        </div>
      </div>
    </div>
  );
}

export default TravelPlan;
