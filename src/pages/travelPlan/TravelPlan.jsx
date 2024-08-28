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
import MapTravelPlan from '../../components/mapTravelPlan/MapTravelPlan';
import { useNavigate, useParams } from 'react-router-dom';
import { getTravelPlanById } from '../../services/travelplan/TravelPlan';
import Cover from '../../assets/MapsCover.avif';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';


const TravelPlan = () => {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [placeImage, setPlaceImage] = useState('');
  const [clickedPlace, setClickedPlace] = useState(null);
  const [addedPlaces, setAddedPlaces] = useState([]);
  const [addedRestaurants, setAddedRestaurants] = useState([]);
  const [addedHotels, setAddedHotels] = useState([]);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense,setExpense]=useState(null);
  const [percentage,setPercentage]=useState(0);

  const fetchTravelPlan = async () => {
    try {
      const data = await getTravelPlanById(id, GetCurrentUserC().sub);
      setData(data);
      setLocation(data.location);
      setTo(data.toDate);
      setFrom(data.fromDate);
      setLat(data.lat);
      setLng(data.longi);
      setPlaceImage(data.imgUrl || Cover);
 
      const totalBudget = data.travelBudgets.reduce((sum, travelBudget) => {
        return sum + parseFloat(travelBudget.cost) || 0; // Convert to number and handle cases where cost might be null or undefined
      }, 0);
    
      setExpense(totalBudget);

      if (totalBudget <= 0) { 
        setPercentage(0);  
      } else {
        if (data.budget && data.budget > 0) { 
          const percentage = (totalBudget / data.budget) * 100;
          if (percentage > 100) {
            setPercentage(100); // Cap the percentage at 100
          } else {
            setPercentage(percentage);
          }
        } else {
          setPercentage(0);
        }
      }
      
    } catch (err) {
      navigate('/');
    }
  };


  useEffect(() => {
    fetchTravelPlan();
  }, [id]);

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
                <TripToTravelPlan location={location} from={from} to={to} />
              </div>
              <ExploreTravelPlan />
              {data && (
                <>
                  <NotesTravelPlan data={data} fetchTravelPlan={fetchTravelPlan} />
                  <hr className='travelplan-hr'/>
                  <PlacesToVisitTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedPlaces={addedPlaces} setAddedPlaces={setAddedPlaces}/>
                  <hr className='travelplan-hr'/>
                  <HotelsTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedHotels={addedHotels} setAddedHotels={setAddedHotels}/>
                  <hr className='travelplan-hr'/>
                  <RestaurantsTravelPlan lat={lat} long={lng} addedRestaurants={addedRestaurants} setAddedRestaurants={setAddedRestaurants} setClickedPlace={setClickedPlace}/>
                  <hr className='travelplan-hr-line'/>
                  <ItineraryTravelPlan to={to} from={from} />
                  <hr className='travelplan-hr-line'/>
                  <BudgetTravelPlan data={data} fetchTravelPlan1={fetchTravelPlan} expense={expense} percentage={percentage}/>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='map'>
          <MapTravelPlan
            lat={parseFloat(lat)}
            lng={parseFloat(lng)}
            place={"as"}
            clickedPlace={clickedPlace}
            setAddedPlaces={setAddedPlaces}
            addedPlaces={addedPlaces}
            addedRestaurants={addedRestaurants}
            addedHotels={addedHotels}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPlan;
