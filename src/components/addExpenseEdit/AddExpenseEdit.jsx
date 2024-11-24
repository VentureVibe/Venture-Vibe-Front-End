import React, { useEffect, useState } from 'react';
import './AddExpenseEdit.scss';
import { editBudget } from '../../services/travelBudget/TravelBudget'; // Ensure this service function is defined
import { getDestination } from '../../services/travelDestination/TravelDestination';

const AddExpenseEdit = ({ onClose,data, fetchTravelPlan,selectedBudget,destinationId=0}) => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPaidByDropdown, setShowPaidByDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedPayer, setSelectedPayer] = useState(selectedBudget.traveler);
  const [selectedDate, setSelectedDate] = useState(selectedBudget.cost);
  const [cost, setCost] = useState(selectedBudget.cost);
  const [description, setDescription] = useState(selectedBudget.description);
  const [travelPlan, setTravelPlan] = useState({});

  useEffect(() => {
    setTravelPlan(data);
    {
      types.map((type) => (
        type.name === selectedBudget.type ? setSelectedItem( type) : null
      ))
    }
    
    console.log(data);
  }, [data]);

  const types = [
    { name: 'Lodging', icon: <i className="fa-solid fa-bed"></i> },
    { name: 'Transport', icon: <i className="fa-solid fa-car"></i> },
    { name: 'Food', icon: <i className="fa-solid fa-utensils"></i> },
    { name: 'Drinks', icon: <i className="fa-solid fa-mug-hot"></i> },
    { name: 'Groceries', icon: <i className="fa-solid fa-cart-shopping"></i> },
    { name: 'Other', icon: <i className="fa-solid fa-note-sticky"></i> }
  ];

  const handleInputClick = () => {
    setShowTypeDropdown(!showTypeDropdown);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowTypeDropdown(false); // Close dropdown after selection
  };

  const handlePaidByClick = () => {
    setShowPaidByDropdown(!showPaidByDropdown);
  };

  const handlePayerClick = (payer) => {
    setSelectedPayer(payer);
    setShowPaidByDropdown(false); // Close dropdown after selection
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (!cost   ) {
      alert('Please add an expense');
      return;
    }
    let destination=null;
    if(destinationId!=0){
      destination=await getDestination(destinationId)
    } 
    // Create the expense data object
    const expenseData = {
      id:selectedBudget.id,
      cost: parseFloat(cost),
      date: selectedDate,
      description:description,
      travelDestination:destination,
      type:selectedItem.name || 'Other',
      traveler:selectedPayer
    };

    try {
      // Call the API to add the budget
      await editBudget(travelPlan.id,expenseData);
      fetchTravelPlan();
 
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };



  return (
    <div className="AddExpenseEdit">
      <div className="container">
        <h4>
          <i onClick={onClose} className="fa-regular fa-circle-xmark"></i>
        </h4>

        <h1>Add Expense</h1>
        <div className="input">
          <p><i className="fa-solid fa-coins"></i></p>
          <input
            type="text"
            placeholder="0"
            value={cost}
            onChange={handleCostChange}
          />
        </div>

        <div className="input" onClick={handleInputClick}>
          <p>
            {selectedItem.icon ? (
              <span className="input-icon">{selectedItem.icon}</span>
            ) : (
              <i className="fa-solid fa-book"></i>
            )}
          </p>
          <div className="input-with-icon" >
            <input
              type="text"
              placeholder="Select item"
              value={selectedItem.name || ''}
              readOnly
            />
          </div>
        </div>
        <div className="input">
          <p><i class="fa-solid fa-pen"></i></p>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleDetailsChange}
          />
        </div>
        {showTypeDropdown && (
          <div className="grid-dropdown">
            {types.map((type, index) => (
              <div
                key={index}
                className="grid-item"
                onClick={() => handleItemClick(type)}
              >
                {type.icon} {type.name}
              </div>
            ))}
          </div>
        )}

        <div className="paidby">
          <p>Paid by:</p>
        </div>
        <div className="selected-payer">
          {selectedPayer ? (
            <div className="selected-payer-1" onClick={handlePaidByClick}>
              <img src={selectedPayer.profileImg} alt={selectedPayer.email} />
              <p>{selectedPayer.email}</p>
            </div>
          ) : (
            <div className="selected-payer-2" onClick={handlePaidByClick}>
              <i className="fa-solid fa-caret-down"></i>
              <p>Select</p>
            </div>
          )}
        </div>
        {showPaidByDropdown && (
          <div className="dropdown2">
            {travelPlan.travelers.map((traveler) => (
              <div
                key={traveler.id}
                className="dropdown2-item"
                onClick={() => handlePayerClick(traveler)}
              >
                <img src={traveler.profileImg} alt={traveler.email} />
                {traveler.email}
              </div>
            ))}
          </div>
        )}

        <div className="date">
          <p>Date:</p>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="button">
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseEdit;
