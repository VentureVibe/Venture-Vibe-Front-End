import React, { useState } from 'react';
import './EditEventListing.scss';
import CloseIcon from '@mui/icons-material/Close';

function EditEventListing( { onClose}) {
  // Initial state setup with the provided event details
  const [formData, setFormData] = useState({
    id: 1,
    imageSrc: '', // Assuming Event1 is a variable holding the image source, initialize this with Event1 or an empty string
    title: "Whales Watching Tour Transfer - Galle",
    location: "Galle",
    description: "Experience the thrill of whale watching in Galle with this exciting tour. Witness these magnificent creatures in their natural habitat as you embark on a thrilling adventure in the deep blue sea.",
    price: 200,
    contactNumber: "071 234 5678",
    email: "kasun@gmail.com",
    sellerName: "Kasun Perera"
  });

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
    <div className='edit-event-listing-form'>
      <div className="closing-i" onClick={onClose}>
        <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
      </div>
    <form onSubmit={handleSubmit}>
      <h2>Edit Event Listing</h2>
      {/* Assuming you have a way to handle image uploads, omitted here for brevity */}
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="contactNumber">Contact Number:</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default EditEventListing;