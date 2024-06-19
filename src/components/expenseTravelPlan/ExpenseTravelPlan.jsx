import React from 'react'
import './ExpenseTravelPlan.scss'
import LocationCityIcon from '@mui/icons-material/LocationCity';

const ExpenseTravelPlan = ({name, date, budget}) => {
  return (
    <div className='expenseTravelPlan'>
        <div className="container">
            <div className="icon-container">
                <i><LocationCityIcon sx={{ color: '#414143', fontSize: 20 }}/></i>
            </div>
            <div className="description-container">
                <div className="place-name">
                    <span>{name}</span>
                </div>
                <div className="date">
                    <span>{date}</span>
                </div>
            </div>
            <div className="budget-container">
                <span>{budget}</span>
            </div>
        </div>
    </div>
  )
}

export default ExpenseTravelPlan