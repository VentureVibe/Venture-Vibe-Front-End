import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import MapTravelPlan from '../../components/mapTravelPlan/MapTravelPlan';



const TravelPlan = () => {

  const { location, lat, lng,to,from } = useParams();
  const [placeImage, setPlaceImage] = useState('');
  const [clickedPlace,setClickedPlace]=useState(null);
  const [addedPlaces, setAddedPlaces] = useState([]);
  const [addedRestaurants, setAddedRestaurants] = useState([]);

  useEffect(() => {
    const fetchPlaceDetails = () => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new window.google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
        radius: 50,
        query: location,
        fields: ['photos'],
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const place = results[0];
          if (place.photos && place.photos.length > 0) {
            const photoUrl = place.photos[0].getUrl({ maxWidth: 800 });
            console.log(photoUrl);
            setPlaceImage(photoUrl);
          }
        }
      });
    };
  
    if (window.google && window.google.maps && window.google.maps.places) {
      fetchPlaceDetails();
    }
  }, [location, lat, lng]);


  return (
    <div className='trvelplan'>
      <div className='container'>
        <div className='planning'>
          <NavbarTravelplan />
          <hr />
          <div className='plan-container'>
            <div className="plan-sidebar">
              <SidebarTravelPlan from={from} to={to} />
            </div>
            <div className='plan-list-container'>
              <div className='plan-list'>

                 <img src={placeImage} alt="Location Image" />
              <TripToTravelPlan location={location} from={from} to={to}  />
              </div>
              <ExploreTravelPlan />
              <NotesTravelPlan />
              <hr className='travelplan-hr'/>
              <PlacesToVisitTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedPlaces={addedPlaces} setAddedPlaces={setAddedPlaces}/>

              <hr className='travelplan-hr'/>
              <HotelsTravelPlan />
              <hr className='travelplan-hr'/>
              <RestaurantsTravelPlan lat={lat} long={lng} addedRestaurants={addedRestaurants} setAddedRestaurants={setAddedRestaurants} setClickedPlace={setClickedPlace}/>
           
              
              <hr className='travelplan-hr-line'/>
              <ItineraryTravelPlan to={to} from={from}  />
              <hr className='travelplan-hr-line'/>
              <BudgetTravelPlan />
            </div>
          </div>
        </div>
        <div className='map'>
              <MapTravelPlan lat={parseFloat(lat)} lng={parseFloat(lng)} place={"as"} clickedPlace={clickedPlace} setAddedPlaces={setAddedPlaces} addedPlaces={addedPlaces} addedRestaurants={addedRestaurants} />
        </div>
      </div>
    </div>
  );




}



export default TravelPlan;
