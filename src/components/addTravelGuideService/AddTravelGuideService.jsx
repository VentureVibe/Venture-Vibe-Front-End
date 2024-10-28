import React, { useState } from 'react';
import './AddTravelGuideServices.scss';

const AddTravelGuideService = ({ onClose,addTravelGuideServices }) => {
  const [service, setService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTravelGuideServices(service)
   // Reset input field
  };

  return (
    <div className="AddTravelGuideService">
    <div className='add-service-modal'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        <h3>Add Service</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='service'>Service Name</label>
            <input
              type='text'
              id='service'
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              placeholder='Add Service'
            />
          </div>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddTravelGuideService;
