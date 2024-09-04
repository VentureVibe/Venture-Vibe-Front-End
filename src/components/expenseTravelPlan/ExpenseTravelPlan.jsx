import React from 'react';
import './ExpenseTravelPlan.scss';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { Link } from 'react-router-dom';

const ExpenseTravelPlan = ({ id, name, date, budget, type, removeBudget,payer,toggleShowEditSetBudget, travelBudget}) => {
  const formattedDate = formatDate(date);

  const typeIcons = {
    Lodging: <i className="fa-solid fa-bed"></i>,
    Transport: <i className="fa-solid fa-car"></i>,
    Food: <i className="fa-solid fa-utensils"></i>,
    Drinks: <i className="fa-solid fa-mug-hot"></i>,
    Groceries: <i className="fa-solid fa-cart-shopping"></i>,
    Other: <i className="fa-solid fa-note-sticky"></i>
  };

  return (
    <div className='expenseTravelPlan'>
      <div className="container">
        <div className="icon-container">
          {typeIcons[type] || <i className="fa-solid fa-question"></i>}
        </div>
        <div className="description-container">
          <div className="place-name">
            <span>{name}</span>
          </div>
          <div className="date">
            <span>{`${formattedDate} ${type}`}</span>
          </div>
        </div>
       
        <div className="budget-container">
              <span>Rs {budget}</span>
         
        </div>
         <div className="payer-container">
              <p>by</p>
              {
                payer ? (
                  <Link to={`/community/profile/${payer.id}`} key={payer.id}>
                       <img src={payer.profileImg} alt="Payer Profile" />
                  </Link>
                   
                 ) : <h1>NA</h1>
              }
        </div>
        <div className="remover" onClick={()=>toggleShowEditSetBudget(travelBudget)}>
          <i class="fa-solid fa-pen"></i>
        </div>
        <div className="remover" onClick={() => removeBudget(id)}>
           <i class="fa-solid fa-trash-can"></i>
        </div>
      
      </div>
    </div>
  );
};

export default ExpenseTravelPlan;

const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ''; // Return an empty string if the date is invalid
  }

  const options = { month: 'short', day: 'numeric' }; // "Jun 4", "Aug 1"
  return date.toLocaleDateString('en-US', options);
};
