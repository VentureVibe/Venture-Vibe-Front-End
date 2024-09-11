import React, { useEffect, useRef, useState } from 'react';
import './GuideProfile.scss';
import profile from '../../assets/man.jpg';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { addTravelGuideService, deleteTravelGuideService, getTravelGuide, updateTravelGuide } from '../../services/serviceProvider/ServiceProvider';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import { getTraveler } from '../../services/traveler/Traveler';
import AddEventListing from '../../components/addEventListing/AddEventListing';
import PopUpMain from '../../components/popupmain/PopUpMain';
import AddTravelGuideService from '../../components/addTravelGuideService/AddTravelGuideService';

const GuideProfile = () => {

  const [travelGuide, setTravelGuide] = useState({});
  const [travelGuideName,setTravelGuideName]=useState("");
  const [showAddNew, setShowAddNew] = useState(false);

  const toggleAddNewPopUp = () => {
    setShowAddNew(!showAddNew);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetCurrentUserC(); 
        const travelGuide1 = await getTravelGuide(data.sub);  
        const data1=await getTraveler(data.sub)
        setTravelGuide(travelGuide1);
        setTravelGuideName(data1.firstName+" "+data1.lastName)
        console.log("travel Guide", travelGuide1);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();  
  }, []);


  const deleteTravelGuideServices=async (id)=>{
    try {
      const user = await GetCurrentUserC(); 
      const data = await deleteTravelGuideService(id); 
      const travelGuide1 = await getTravelGuide(user.sub);  
      setTravelGuide(travelGuide1);
    } catch (error) {
      console.error("Error fetching data:", error);
   }
  }

  const handleAddTravelGuideServices = async (service) => {
    try {
      const user = await GetCurrentUserC(); 
      const travelGuide = await getTravelGuide(user.sub);  
      const data = { service, travelGuide };
      const result = await addTravelGuideService(data); // Rename this call to avoid recursion
      const updatedTravelGuide = await getTravelGuide(user.sub);  
      setTravelGuide(updatedTravelGuide);
      setShowAddNew(!showAddNew);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <div className='GuideProfile'>
      <div className="left">
        <img src={profile} alt="profile pic" />
        <h3>{travelGuideName}</h3>
        <p>{travelGuide.contactNumber}</p>
        <p>{travelGuide.email}</p>
        <button>
          <i class="fa-regular fa-star"></i>
          Ratings
        </button>
      </div>
      <div className="right">
        {travelGuide && (
          <MapContainer
            radius={travelGuide.radius}
            lat={travelGuide.sp_lat}
            lng={travelGuide.sp_lng}
            travelGuide={travelGuide}
            setTravelGuide={setTravelGuide}
          />
        )}
        <div className="down">
          <div className="down-left">
            <div className="top">
              <h3>My Services</h3>
              <button onClick={toggleAddNewPopUp}>
                <i className="fa-solid fa-plus"></i>
                <span>Add</span>
              </button>
            </div>
            <ul className="services-list">
            {travelGuide.travelGuideServices && travelGuide.travelGuideServices.length > 0 ? (
                travelGuide.travelGuideServices.map((experience, index) => (
            <li key={index}>
             {experience.service}
             <i onClick={() => deleteTravelGuideServices(experience.id)} className="fa-regular fa-trash-can"></i>

            </li>
         ))
    ) : (
      <li className="no-experience">
        No experiences available.
      </li>
    )}
  </ul>
         
          </div>
          <div className="down-right">
            <div className="left">
              <h3>My Off Days</h3>
              <Calendar />
            </div>
            <div className="right">
              <h3>Experiences</h3>
              <div className="bottom">
              {travelGuide.experiences && travelGuide.experiences.length > 0 ? (
                travelGuide.experiences.map((experience, index) => (
                <div key={index} className="cont">
                  <div className="cname">
                     <h5>Company Name</h5>
                     <p>{experience.companyName}</p>
                  </div>
                <div className="crole">
                    <h5>Role</h5>
                    <p>{experience.role}</p>
                </div>
                <div className="cexperience">
                    <h5>Experience</h5>
                    <p>{experience.yearsOfExperience}</p>
        </div>
      </div>
    ))
  ) : (
    <div className="no-experience">
      <p>No experiences available.</p>
    </div>
  )}
</div>

            </div>     
          </div>
        </div>
      </div>
      {showAddNew && (
          <PopUpMain
          Component={
            <AddTravelGuideService 
              onClose={toggleAddNewPopUp} 
              addTravelGuideServices={handleAddTravelGuideServices}  // Use renamed function
            />
          }
        />
       )}
    </div>
  );
};

const MapContainer = ({ radius, lat, lng, travelGuide,setTravelGuide}) => {
  const mapRef = useRef(null);
  const [circleRadius, setCircleRadius] = useState(Number(radius)); // Initialize radius from props
  const [center, setCenter] = useState({ lat: Number(lat), lng: Number(lng) }); // Initialize center from props

  // Function to send updated data to backend
  const sendDataToBackend = async (updatedRadius, updatedCenter) => {
    try {
      travelGuide.radius = updatedRadius;
      travelGuide.sp_lat = updatedCenter.lat(); // Google Maps API requires .lat() and .lng() to get values
      travelGuide.sp_lng = updatedCenter.lng();
      await updateTravelGuide(travelGuide);
      const travelGuide1 = await getTravelGuide(travelGuide.id);  
      setTravelGuide(travelGuide1);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  useEffect(() => {
    // Convert lat and lng to numbers
    const latitude = Number(lat);
    const longitude = Number(lng);

    // Create a new Google Map instance and attach it to the ref
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude }, // Use the converted latitude and longitude
      zoom: 10,
    });

    // Create a new circle and attach it to the map
    const circle = new window.google.maps.Circle({
      map: map,
      center: { lat: latitude, lng: longitude }, // Use the converted latitude and longitude
      radius: radius, // Use the state radius
      fillColor: '#0075C3',
      fillOpacity: 0.35,
      strokeColor: '#0075C3',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      draggable: true, // Allow dragging the circle
      editable: true, // Allow editing the circle's radius
    });

    // Listener for when the circle's radius is changed
    window.google.maps.event.addListener(circle, 'radius_changed', () => {
      const newRadius = Number(circle.getRadius());
      setCircleRadius(newRadius); // Update the state with the new radius
      sendDataToBackend(newRadius, circle.getCenter()); // Send updated data to the backend
    });

    // Listener for when the circle is dragged to a new center
    window.google.maps.event.addListener(circle, 'center_changed', () => {
      const newCenter = circle.getCenter(); // Get the new center of the circle
      setCenter(newCenter); // Update the state with the new center
      sendDataToBackend(circle.getRadius(), newCenter); // Send updated data to the backend
    });

    // Cleanup function to remove listeners when the component is unmounted or updated
    return () => {
      window.google.maps.event.clearListeners(circle, 'radius_changed');
      window.google.maps.event.clearListeners(circle, 'center_changed');
    };
  }, [circleRadius, lat, lng, travelGuide]); // Re-run the effect if circleRadius, lat, lng, or travelGuide changes

  return (
    <div className="map">
      <h4>My Region</h4>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};


const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="date-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />
    </div>
  );
};

export default GuideProfile;
