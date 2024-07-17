import React, { useState } from 'react';
import './AddEventListing.scss';
import CloseIcon from '@mui/icons-material/Close';

function AddEventListing({ onClose}) {

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    console.log('Form data submitted:', formData);
    // Reset form or redirect user after submission
  };

  return (
    <div className='add-event-listing-form'>
      <div className="closing-i" onClick={onClose}>
        <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
      </div>
    <form onSubmit={handleSubmit}>
      <h2>Add Event Listing</h2>
      {/* Assuming you have a way to handle image uploads, omitted here for brevity */}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          //value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          //value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          //value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          //value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          //value={formData.contactNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          //value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Event</button>
    </form>
    </div>
  );
}

export default AddEventListing;