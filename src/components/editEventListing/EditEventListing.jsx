import React, { useState, useEffect, useRef } from "react";
import "./EditEventListing.scss";
import CloseIcon from "@mui/icons-material/Close";
import { getEventById, updateEvent } from "../../services/events/eventServices";
import { GetCurrentUserC } from "../../services/user/GetCurrentUserC";
import Loading from "../loading/Loading";

function EditEventListing({ eventId, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    contactNumber: "",
    email: "",
    location: "",
    eventImage: null,
  });
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const eventDetails = await getEventById(eventId);

        setFormData({
          title: eventDetails.eventTitle,
          description: eventDetails.eventDescription,
          price: eventDetails.eventPrice,
          contactNumber: eventDetails.contactPhone,
          email: eventDetails.contactEmail,
          location: eventDetails.eventLocation,
          eventImage: null,
        });
        setCoordinates({
          lat: eventDetails.eventLat,
          lng: eventDetails.eventLon,
        });

        setImagePreview(eventDetails.eventImage || "");

        const google = window.google;
        if (google && mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: eventDetails.eventLat, lng: eventDetails.eventLon },
            zoom: 15,
          });

          markerRef.current = new google.maps.Marker({
            position: new google.maps.LatLng(
              eventDetails.eventLat,
              eventDetails.eventLon
            ),
            map: map,
          });

          const input = document.getElementById("location");
          input.value = eventDetails.eventLocation;
          const autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const location = place.geometry.location;
              map.setCenter(location);
              map.setZoom(15);

              setFormData((prevState) => ({
                ...prevState,
                location: place.formatted_address,
              }));

              setCoordinates({
                lat: location.lat(),
                lng: location.lng(),
              });

              if (markerRef.current) {
                markerRef.current.setMap(null);
              }

              markerRef.current = new google.maps.Marker({
                position: location,
                map: map,
              });

              setFormData((prevState) => ({
                ...prevState,
                location: input.value,
              }));
            }
          });
          autocompleteRef.current = autocomplete;

          map.addListener("click", (event) => {
            const clickedLocation = event.latLng;

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            markerRef.current = new google.maps.Marker({
              position: clickedLocation,
              map: map,
            });

            setCoordinates({
              lat: clickedLocation.lat(),
              lng: clickedLocation.lng(),
            });

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: clickedLocation },
              (results, status) => {
                if (status === "OK" && results[0]) {
                  setFormData((prevState) => ({
                    ...prevState,
                    location: results[0].formatted_address,
                  }));
                  input.value = results[0].formatted_address;
                }
              }
            );
          });
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevState) => ({
        ...prevState,
        eventImage: file,
      }));
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setFormData((prevState) => ({
      ...prevState,
      eventImage: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const decodedToken = GetCurrentUserC();
      const userId = decodedToken.sub;

      const updatedData = {
        eventId: eventId,
        userId,
        eventTitle: formData.title,
        eventDescription: formData.description,
        eventPrice: parseFloat(formData.price),
        eventLat: coordinates.lat,
        eventLon: coordinates.lng,
        contactEmail: formData.email,
        contactPhone: formData.contactNumber,
      };

      const formDataObj = new FormData();
      formDataObj.append("event", JSON.stringify(updatedData));
      if (formData.eventImage) {
        formDataObj.append("image", formData.eventImage);
      }
      console.log(formDataObj);
      console.log(updatedData);
      await updateEvent(formDataObj);

      if (onClose) onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating event:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-event-listing-form">
      {loading && <Loading />}
      <div className="head-edit-event">
        <h2>Edit Event Listing</h2>
        <i onClick={onClose}>
          <CloseIcon sx={{ color: "#f68712", fontSize: 25 }} />
        </i>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="edit-event-left">
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={formData.description}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChange}
              value={formData.price}
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              onChange={handleChange}
              value={formData.contactNumber}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <button type="submit">Save Changes</button>
        </div>
        <div className="edit-event-right">
          <div id="eventImage-container">
            {!imagePreview && (
              <div>
                <label htmlFor="eventImage">Event Image</label>
                <input
                  type="file"
                  id="eventImage"
                  name="eventImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            )}
            {imagePreview && (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
                <i className="close-btn-image" onClick={handleImageRemove}>
                  <CloseIcon sx={{ color: "#f68712", fontSize: 20 }} />
                </i>
              </div>
            )}
          </div>
          <div className="enter-location">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              value={formData.location}
            />
          </div>
          <div ref={mapRef} className="map-container"></div>
        </div>
      </form>
    </div>
  );
}

export default EditEventListing;
