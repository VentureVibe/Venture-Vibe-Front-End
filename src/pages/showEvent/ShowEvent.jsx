// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "./ShowEvent.scss";

// const ShowEvent = () => {
//   const { id } = useParams(); // Get the eventId from the URL parameters
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         console.log(id);
//         const response = await fetch(
//           `http://localhost:8080/api/v1/events/${id}`
//         );
//         const data = await response.json();
//         setEvent(data);
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   if (!event) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       className="showEvent"
//       style={{ backgroundImage: `url(${event.eventImage})` }} // Set the background image here
//     >
//       <div className="wrapper">
//         <div className="infoContainer">
//           <h1>{event.eventTitle}</h1>
//           <span className="location">
//             Location: {event.eventLat}, {event.eventLon}
//           </span>
//           <span className="des">{event.eventDescription}</span>
//           <span className="price">
//             <b>${event.eventPrice}</b>
//           </span>
//           <hr />
//           <span className="detail">Contact: {event.contactEmail}</span>
//           <span className="detail">Phone: {event.contactPhone}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShowEvent;

import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowEvent.scss";

const ShowEvent = () => {
  const { id } = useParams(); // Get the eventId from the URL parameters
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/events/${id}`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="showEvent"
      style={{ backgroundImage: `url(${event.eventImage})` }} // Set the background image here
    >
      <div className="wrapper">
        <div className="infoContainer">
          <h1>{event.eventTitle}</h1>
          <span className="des">{event.eventDescription}</span>
          <span className="price">
            <b>${event.eventPrice}</b>
          </span>
          <hr />
          <span className="detail">Contact: {event.contactEmail}</span>
          <span className="detail">Phone: {event.contactPhone}</span>
        </div>
        <div className="mapContainer">
          <MapContainer lat={event.eventLat} lng={event.eventLon} />
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;

const MapContainer = ({ lat, lng }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
    });
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};
