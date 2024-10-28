import React, { useState, useEffect } from 'react';
import './SetBudget.scss';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { addBudgetToTravelPlan } from '../../services/travelplan/TravelPlan'; // Adjust the import based on your service location

const SetBudget = ({ onClose, travelPlanId, fetchTravelPlan, budget1 }) => {
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (budget1 !== null && budget1 !== undefined) {
      setBudget(budget1.toString()); // Initialize state with budget1 if it's not null
    }
  }, [budget1]); // Dependency array to run the effect when budget1 changes

  // Handle input change
  const handleInputChange = (e) => {
    setBudget(e.target.value);
  };

  // Handle save button click
  const handleSave = () => {
    if (!budget || isNaN(budget)) {
      return;
    }

    addBudgetToTravelPlan(travelPlanId, parseFloat(budget))
      .then(() => {
        fetchTravelPlan();
        onClose(); // Close the modal after saving
      })
      .catch((error) => {
        console.error('Error saving budget:', error);
      });
  };

  return (
    <div className='setBudget'>
      <div className="container">
        <div className="closing-i" onClick={onClose}>
          <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
        </div>
        <div className="header">
          <span>Set Budget</span>
        </div>
        <div className="type-budget">
          <i><AttachMoneyIcon sx={{ color: '#747474', fontSize: 22 }} /></i>
          <input
            type="text"
            placeholder='0'
            value={budget}
            onChange={handleInputChange}
          />
        </div>
        <div className="save-btn" onClick={handleSave}>
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

export default SetBudget;
