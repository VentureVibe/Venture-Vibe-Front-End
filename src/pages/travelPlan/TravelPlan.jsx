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
import ItineraryTravelPlan from '../../components/itineraryTravelPlan/ItineraryTravelPlan';
import BudgetTravelPlan from '../../components/budgetTravelPlan/BudgetTravelPlan';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const TravelPlan = () => {

  return (
    <div className='trvelplan'>
      <div className='container'>
        <div className='planning'>
          <NavbarTravelplan />
          <hr />
          <div className='plan-container'>
            <div className="plan-sidebar">
              <SidebarTravelPlan />
            </div>
            <div className='plan-list-container'>
              <div className='plan-list'>
                <img src={galle} alt="Galle" />
                <TripToTravelPlan />
              </div>
              <ExploreTravelPlan />
              <NotesTravelPlan />
              <hr className='travelplan-hr'/>
              <HotelsTravelPlan />
              <hr className='travelplan-hr'/>
              <PlacesToVisitTravelPlan />
              <hr className='travelplan-hr'/>
              <RestaurantsTravelPlan />
              <hr className='travelplan-hr'/>
              <EventsTravelPlan />
              <hr className='travelplan-hr'/>
              <TransportTravelPlan />
              <hr className='travelplan-hr-line'/>
              <ItineraryTravelPlan />
              <hr className='travelplan-hr-line'/>
              <BudgetTravelPlan />
            </div>
          </div>
        </div>
        <div className='map'>
            <MapTravelPlan />
        </div>
      </div>
    </div>
  );
}


const containerStyle = {
  width: '100%',
  height:"100%"
};

const center = {
  lat: 6.0329,
  lng: 80.2168
};

const MapTravelPlan = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCHC8CdWrCw593DZUii78rtRV-whzvwKwE">
      <GoogleMap
        mapContainerStyle={containerStyle} 
        center={center}
        zoom={13}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
  );
};


export default TravelPlan;
