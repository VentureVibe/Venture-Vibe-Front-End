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
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const markerRef = useRef(null);

  //Fetch event details
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
          location: eventDetails.eventLocation, // Adjust based on your API response
          eventImage: null,
        });
        setCoordinates({
          lat: eventDetails.eventLat,
          lng: eventDetails.eventLon,
        });

        // Directly use the S3 URL for image preview
        setImagePreview(eventDetails.eventImage || "");

        // Initialize map
        const google = window.google;
        if (google) {
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

              // Update the location input field
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prevState) => ({
        ...prevState,
        eventImage: file,
      }));
    }
  };

  const logFormData = (formData) => {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("eventId : ", eventId);

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

      // Create FormData object
      const formDataObj = new FormData();
      formDataObj.append("event", JSON.stringify(updatedData));
      if (formData.eventImage) {
        formDataObj.append("image", formData.eventImage);
      }

      console.log(formDataObj);
      logFormData(formDataObj);
      await updateEvent(formDataObj);

      // Reset form or redirect user after submission
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
          <CloseIcon sx={{ color: "#747474", fontSize: 20 }} />
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
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
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
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            </div>
          )}
          <button type="submit">Save Changes</button>
        </div>
        <div className="edit-event-right">
          <div className="enter-location">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div ref={mapRef} className="map-container"></div>
        </div>
      </form>
    </div>
  );
}

export default EditEventListing;
