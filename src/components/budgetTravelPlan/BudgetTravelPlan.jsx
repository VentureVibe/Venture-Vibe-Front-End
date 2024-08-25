import React, { useEffect, useState } from 'react'
import './BudgetTravelPlan.scss';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExpenseTravelPlan from '../expenseTravelPlan/ExpenseTravelPlan';
import InviteTripmate from '../inviteTripmate/InviteTripmate';
import PopUpMain from '../popupmain/PopUpMain';
import SetBudget from './../setBudget/SetBudget';
import { useParams } from 'react-router-dom';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC'; // Ensure this import is correct
import { getTravelPlanById } from '../../services/travelplan/TravelPlan';

const BudgetTravelPlan = () => {

  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
  const [showInviteTrip, setShowInviteTrip] = useState(false);
  const [showSetBudget, setShowSetBudget] = useState(false);
  const { id } = useParams();
  const [userId,setUserId]=useState('');
  const [travelPlan, setTravelPlan] = useState(null);

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  const toogleSetBudgetPopUp =() => {
    setShowSetBudget(!showSetBudget);
  }

  const toggleInviteTripmatePopUp = () => {
    setShowInviteTrip(!showInviteTrip);
  };

  const fetchTravelPlan = async () => {
    const jwtToken = GetCurrentUserC();
    setUserId(jwtToken.sub);
    try {
      const data = await getTravelPlanById(id, jwtToken.sub);
      console.log(data);
      setTravelPlan(data);
    } catch (error) {
      console.error('Error fetching travel plan:', error);
    }
  };
  
  useEffect(() => {
    fetchTravelPlan();
  }, []); 

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
                  <div className="set-budget-btn" onClick={toogleSetBudgetPopUp}>
                    <i><EditIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                    <span>Set Budget</span>
                  </div>
                  {travelPlan?.travelPlanOwner?.id === userId && (
                    <div className="add-friend" onClick={toggleInviteTripmatePopUp}>
                        <i><GroupAddIcon sx={{ color: '#414143', fontSize: 30 }}/></i>
                    </div>
                    )}
                 
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
          {showInviteTrip && (
              <PopUpMain Component={<InviteTripmate onClose={toggleInviteTripmatePopUp} travelPlanId={id} />} />
          )}
          {showSetBudget && (
              <PopUpMain Component={<SetBudget onClose={toogleSetBudgetPopUp} />} />
          )}
      </div>
    </div>
  )
}

export default BudgetTravelPlan
