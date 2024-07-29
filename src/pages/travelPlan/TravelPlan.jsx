import React, { useEffect, useState } from 'react';
import "./TravelPlan.scss";
import NavbarTravelplan from '../../components/navbarTravelplan/NavbarTravelplan';
import SidebarTravelPlan from '../../components/sidebarTravelPlan/SidebarTravelPlan';
import TripToTravelPlan from '../../components/tripToTravelPlan/TripToTravelPlan';
import ExploreTravelPlan from '../../components/exploreTravelPlan/ExploreTravelPlan';
import NotesTravelPlan from '../../components/notesTravelPlan/NotesTravelPlan';
import HotelsTravelPlan from '../../components/hotelsTravelPlan/HotelsTravelPlan';
import PlacesToVisitTravelPlan from '../../components/placesToVisitTravelPlan/PlacesToVisitTravelPlan';
import RestaurantsTravelPlan from '../../components/restaurantsTravelPlan/RestaurantsTravelPlan';

import ItineraryTravelPlan from '../../components/itineraryTravelPlan/ItineraryTravelPlan';
import BudgetTravelPlan from '../../components/budgetTravelPlan/BudgetTravelPlan';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useNavigate, useParams } from 'react-router-dom';
import MapTravelPlan from '../../components/mapTravelPlan/MapTravelPlan';
import { getTravelPlanById } from '../../services/travelplan/TravelPlan';
import Cover from '../../assets/MapsCover.avif'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import { getCurrentUser } from 'aws-amplify/auth';
const TravelPlan = () => {

  
  const [location,setLocation]=useState('');
  const [lat,setLat]=useState('');
  const [lng,setLng]=useState('');
  const [to,setTo]=useState('');
  const [from,setFrom]=useState('');
  const [placeImage, setPlaceImage] = useState('');

  const [clickedPlace,setClickedPlace]=useState(null);
  const [addedPlaces, setAddedPlaces] = useState([]);
  const [addedRestaurants, setAddedRestaurants] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        
        const data = await getTravelPlanById(id,GetCurrentUserC().sub);
        console.log(data);
        setLocation(data.location);
        setTo(data.toDate);
        setFrom(data.fromDate);
        setLat(data.lat)
        setLng(data.longi)
        setPlaceImage(data.imgUrl || Cover);

        
      } catch (err) {
          navigate("/");
      }
    };

    fetchTravelPlan();
  }, []);


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
