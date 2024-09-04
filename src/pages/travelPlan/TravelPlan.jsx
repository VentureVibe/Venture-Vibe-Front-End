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
import { addDestination } from '../../services/travelDestination/TravelDestination';
import { getTraveler } from '../../services/traveler/Traveler';

const TravelPlan = () => {
  const [location, setLocation] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [placeImage, setPlaceImage] = useState('');
  const [clickedPlace, setClickedPlace] = useState(null);
  const [addedPlaces, setAddedPlaces] = useState([]);
 
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense,setExpense]=useState(null);
  const [percentage,setPercentage]=useState(0);
  const [addedPlaces1, setAddedPlaces1] = useState([]);
  const [addedHotels, setAddedHotels] = useState([]);
  const [addedRestaurants, setAddedRestaurants] = useState([]);

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
     
      if(data.travelBudgets==null){
        const totalBudget =0;
      }
      else{
        const totalBudget = data.travelBudgets.reduce((sum, travelBudget) => {
          return sum + parseFloat(travelBudget.cost) || 0; // Convert to number and handle cases where cost might be null or undefined
        }, 0);
      }
    

      setAddedPlaces(data.travelDestinations);
    
      setExpense(totalBudget);
      updatePlaces();

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
         console.log(error)
    
    }
  };

  const getPlaceImageUrl = (photo_reference) => {
    const apiKey = "AIzaSyC3LyQbFwr-PRsAhiJnQRFkQqo_1f2GtQY"; // Replace with your actual API key
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${apiKey}`;
  };

  const updatePlacesInBackend = async (recentPlace,type) => {
    try {
      console.log(recentPlace);
      const traveler = await getTraveler(GetCurrentUserC().sub);
  
      if (recentPlace) {

        const lat = recentPlace.geometry?.location?.lat() || recentPlace.lat;
        const longi = recentPlace.geometry?.location?.lng() || recentPlace.longi;
  
        if (isNaN(lat) || isNaN(longi)) {
          throw new Error('Invalid latitude or longitude values');
        }
  
        const photoUrl = recentPlace.photos?.length > 0
          ? getPlaceImageUrl(recentPlace.photos[0].photo_reference)
          : null;

        let index=0;

        if(type=="Places"){
          index=addedPlaces.length;
        }

        if(type=="Hotels"){
          index=addedHotels.length;
        }

        if(type=="Restrurents"){
          index=addedRestaurants.length;
        }

        const updatedPlace = {
          lat: lat,
          longi: longi,
          description: "",
          index:index,
          name: recentPlace.name,
          imgUrl: photoUrl,
          type: type,
          rating:recentPlace.rating,
          traveler
        };
  
        const { data } = await addDestination(id, updatedPlace);
        console.log('Place sent successfully:', data);
        fetchTravelPlan()
       
      } else {
       
      }
  
    } catch (error) {
      console.error('Error updating places:', error);
    }
  };
  
  const updatePlaces = async () => {
    try {
      // Fetch the updated travel plan
      const data1 = await getTravelPlanById(id, GetCurrentUserC().sub);
      if(data1.travelDestinations==null){

      }
      else{
        const places = data1.travelDestinations.filter(dest => dest.type === 'Places');
        const hotels = data1.travelDestinations.filter(dest => dest.type === 'Hotels');
        const restrurents = data1.travelDestinations.filter(dest => dest.type === 'Restrurents');
        // Set the separated data for places and hotels
        setAddedPlaces1(places);  // Places filtered from travelDestinations
        setAddedHotels(hotels);  
        setAddedRestaurants(restrurents); 
      }
      // Assuming travelDestinations is an array of destinations within the travel plan
    // Hotels filtered from travelDestinations
    } catch (error) {
      console.error('Error updating places:', error);
    }
  };
  


  useEffect(() => {
    console.log(GetCurrentUserC().sub);
    fetchTravelPlan();
    updatePlaces();
  }, [id]);

  useEffect(() => {
    if (addedPlaces.length ) {
      updatePlacesInBackend(); // Send updated places when they change
    }
  }, [addedPlaces]);

  


  
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
                  <PlacesToVisitTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedPlaces={addedPlaces1} setAddedPlaces={setAddedPlaces}  updatePlacesInBackend={ updatePlacesInBackend}  fetchTravelPlan={fetchTravelPlan} travelPlan={data}/>
                  <hr className='travelplan-hr'/>
                  <HotelsTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedHotels={addedHotels} setAddedHotels={setAddedHotels} setAddedPlaces={setAddedPlaces} updatePlacesInBackend={ updatePlacesInBackend}  fetchTravelPlan={fetchTravelPlan} travelPlan={data}/>
                  <hr className='travelplan-hr'/>
                  <RestaurantsTravelPlan lat={lat} long={lng} setClickedPlace={setClickedPlace} addedRestaurants={addedRestaurants} setAddedRestaurants={setAddedRestaurants}  setAddedPlaces={setAddedPlaces} updatePlacesInBackend={ updatePlacesInBackend}  fetchTravelPlan={fetchTravelPlan} travelPlan={data}/>
                  <hr className='travelplan-hr-line'/>
                  <ItineraryTravelPlan to={to} from={from} travelPlan={data} fetchTravelPlan={fetchTravelPlan } setClickedPlace={setClickedPlace}/>
                  <hr className='travelplan-hr-line'/>
                  <BudgetTravelPlan data={data} fetchTravelPlan1={fetchTravelPlan} expense={expense} percentage={percentage} />
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
            updatePlacesInBackend={ updatePlacesInBackend}
           
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPlan;
