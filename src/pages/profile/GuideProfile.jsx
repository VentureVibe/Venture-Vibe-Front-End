import React, { useEffect, useRef, useState } from 'react'
import './GuideProfile.scss'
import profile from '../../assets/man.jpg'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const GuideProfile = () => {
    return (
      <div className='GuideProfile'>
        <div className="left">
          <img src={profile} alt="profile pic" />
          <h3>Kaveesha Weerakoon</h3>
          <p>+94 775902645</p>
          <p>Kaveesha@gmail.com</p>
          <button>
            <i className="fa-solid fa-pen"></i>
            Edit
          </button>
        </div>
        <div className="right">
                <MapContainer />
                <div className="down">
                    <div className="down-left">
                         <div className="top">
                             <h3>My Services</h3>
                             <button>
                                   <i class="fa-solid fa-plus"></i>
                                   <span>Add</span>
                             </button>
                          </div>
                           
                            <ul className="services-list">
            
                                <li>Service 1 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 2 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 3 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 1 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 2 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 3 <i class="fa-regular fa-trash-can"></i></li>  <li>Service 1 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 2 <i class="fa-regular fa-trash-can"></i></li>
                                <li>Service 3 <i class="fa-regular fa-trash-can"></i></li>
                            </ul>
                    </div>
                    <div className="down-right">
                        <h3>My Off Days</h3>
                        <div className="down">
                            <div className="left">
                                <Calendar />
                            </div> 
                            <div className="right">
                                <span>
                                  <i class="fa-brands fa-facebook-f"></i>
                                  <p>Facebook</p>
                                </span>
                                <span>
                                  <i class="fa-brands fa-instagram"></i>
                                  <p>Instagram</p>
                                </span>
                                <span>
                                  <i class="fa-brands fa-tiktok"></i>
                                  <p>Tik tok</p>
                                </span>
                                <span>
                                  <i class="fa-brands fa-whatsapp"></i>
                                  <p>Whatsapp</p>
                                </span>
                                 
                                
                                 
                            </div>
                        </div>
                       
                       
                    </div>

                </div>
        </div>
      </div>
    );
  };
  

  const MapContainer = () => {
    const mapRef = useRef(null);
    const [radius, setRadius] = useState(15000); // Initial radius in meters
  
    useEffect(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 7.8731, lng: 80.7718 },
        zoom: 10,
      });
  
      const circle = new window.google.maps.Circle({
        map: map,
        center: { lat: 7.8731, lng: 80.7718 },
        radius: radius, 
        fillColor: '#0075C3',
        fillOpacity: 0.35,
        strokeColor: '#0075C3',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        draggable: true,
        editable: true,
      });
  
      // Update circle radius when radius state changes
      circle.setRadius(radius);
  
      // Optional: add event listener to update radius when circle is resized
      window.google.maps.event.addListener(circle, 'radius_changed', () => {
        setRadius(circle.getRadius());
      });
    }, [radius]);
  
    return (
      <div className='map'>
        <h4 >My Region</h4>
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


export default GuideProfile
