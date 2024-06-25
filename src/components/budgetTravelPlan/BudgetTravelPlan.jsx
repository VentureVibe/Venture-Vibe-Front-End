import React, { useState } from 'react'
import './BudgetTravelPlan.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpenseTravelPlan from '../expenseTravelPlan/ExpenseTravelPlan';

const BudgetTravelPlan = () => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  return (
    <div className='budgetTravelPlan' id='view'>
      <div className="container">
        <div className='top-container'>
            <div className='budget-tag'>
              <span>Budgeting</span>
            </div>
            <div className='browseall-btn'>
              <i><AddOutlinedIcon sx={{ color: '#ffffff', fontSize: 20 }} /></i>
              <span>Add Expense</span>
            </div>
          </div>
          <div className='bottom-container'>
              <div className="top-budget-container">
                  <span>$700.00</span>
              </div>
                <div className="set-budget">
                  <div className="set-budget-btn">
                    <i><EditIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                    <span>Set Budget</span>
                  </div>
                  <i className='add-friend'><GroupAddIcon sx={{ color: '#414143', fontSize: 30 }}/></i>
                </div>
          </div>
          <div className="expenses-container">
            <div className="heading-expenses">
              <div className='expense-tag' onClick={toggleBottomContainer}>
                <i><KeyboardArrowDownIcon sx={{ color: '#414143' }} /></i>
                <h2>Expenses</h2>
              </div>
            {isBottomContainerVisible && (
              <div className='sort-btn'>
                <span>Sort: Date</span>
                <i><ArrowDownwardIcon sx={{ color: '#414143', fontSize: 20 }} /></i>
              </div>
            )}
            </div>
            {isBottomContainerVisible && (
              <div className="list-expense">
                  <ExpenseTravelPlan name='Araliya Resort Unawatuna' date='12/12/2021' budget='$200.00' />
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default BudgetTravelPlan
