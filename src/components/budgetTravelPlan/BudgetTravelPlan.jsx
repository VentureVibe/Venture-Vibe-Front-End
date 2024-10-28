import React, { useEffect, useState } from 'react';
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
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC'; 
import AddExpense from '../addExpense/AddExpense';
import { removeBudget } from '../../services/travelBudget/TravelBudget';
import AddExpenseEdit from '../addExpenseEdit/AddExpenseEdit';

const BudgetTravelPlan = ({ data, fetchTravelPlan1, expense, percentage }) => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
  const [showInviteTrip, setShowInviteTrip] = useState(false);
  const [showAddExpense, setshowAddExpense] = useState(false);
  const [showSetBudget, setShowSetBudget] = useState(false);
  const [showEditSetBudget, setEditSetBudget] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const { id } = useParams();
  const [userId, setUserId] = useState('');

  // Sorting States
  const [sortField, setSortField] = useState('date'); // date or cost
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  const toggleSetBudgetPopUp = () => {
    setShowSetBudget(!showSetBudget);
  };

  const toggleInviteTripmatePopUp = () => {
    setShowInviteTrip(!showInviteTrip);
  };

  const toggleAddExpense = () => {
    setshowAddExpense(!showAddExpense);
  };

  const toggleShowEditSetBudget = (travelBudget) => {
    setSelectedBudget(travelBudget);
    setEditSetBudget(!showEditSetBudget);
  };

  const removeBudget1 = async (id) => {
    try {
      await removeBudget(id);
      fetchTravelPlan1();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchUserIdAndPlan = async () => {
      try {
        const currentUser = await GetCurrentUserC();
        setUserId(currentUser.sub);
        fetchTravelPlan1(); // Fetch travel plan data
      } catch (error) {
        console.error('Error fetching user or travel plan:', error);
      }
    };
    
    fetchUserIdAndPlan();
  }, [id]);

  // Sorting logic
  const sortedTravelBudgets = [...data.travelBudgets].sort((a, b) => {
    if (sortField === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortField === 'budget') {
      return sortOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost;
    }
    return 0;
  });

  const handleSortChange = (field) => {
    if (sortField === field) {
      // Toggle the sort order if the same field is selected
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the new sort field and default to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className='budgetTravelPlan' id='view'>
      <div className="container">
        <div className='top-container'>
          <div className='budget-tag'>
            <span>Budgeting</span>
          </div>
          <div className='browseall-btn' onClick={toggleAddExpense}>
            <i><AddOutlinedIcon sx={{ color: '#ffffff', fontSize: 20 }} /></i>
            <span>Add Expense</span>
          </div>
        </div>
        <div className='bottom-container'>
          <div className="top-budget-container">
            <span>Rs {expense || '0.00'}</span> 
          </div>
          <div className="line">
             <div className="cont">
              <div style={{ width: `${percentage}%`, height: "100%", borderRadius: "5px", backgroundColor: '#F68712' }}> 
              </div>
             </div>
          </div>
          <div className="set-budget">
            <div className="set-budget-btn" onClick={toggleSetBudgetPopUp}>
              <i><EditIcon sx={{ color: '#414143', fontSize: 18 }} /></i>
              <span>
                  {data.budget === 0 ? 'Set Budget' : 'Edit Budget'}
              </span>
            </div>
            <p>Budget: ALL {data.budget || '0.00'}</p> 
            {data.travelPlanOwner.id === userId && (
              <div className="add-friend" onClick={toggleInviteTripmatePopUp}>
                <GroupAddIcon sx={{ color: '#747474', fontSize: 27 }} />
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
                <span onClick={() => handleSortChange(sortField === 'date' ? 'budget' : 'date')}>
                  Sort by: {sortField === 'date' ? 'Date' : 'Budget'}
                </span>
                <i><ArrowDownwardIcon sx={{ color: '#414143', fontSize: 20 }} /></i>
              </div>
            )}
          </div>
          {isBottomContainerVisible && (
            <div className="list-expense">
              {
                sortedTravelBudgets.map((travelBudget) => (
                  <ExpenseTravelPlan
                    key={travelBudget.id}
                    id={travelBudget.id}
                    name={travelBudget.description}
                    date={travelBudget.date}
                    budget={travelBudget.cost}
                    type={travelBudget.type}
                    removeBudget={removeBudget1}
                    payer={travelBudget.traveler}
                    toggleShowEditSetBudget={toggleShowEditSetBudget}
                    travelBudget={travelBudget}
                  />
                ))
              }
            </div>
          )}
        </div>
        {showInviteTrip && (
          <PopUpMain Component={<InviteTripmate onClose={toggleInviteTripmatePopUp} travelPlanId={data.id} />} />
        )}
        {showSetBudget && (
          <PopUpMain Component={<SetBudget budget1={data.budget} travelPlanId={data.id} onClose={toggleSetBudgetPopUp} fetchTravelPlan={fetchTravelPlan1} />} />
        )}
        {showAddExpense && (
          <PopUpMain Component={<AddExpense onClose={toggleAddExpense} data={data} fetchTravelPlan={fetchTravelPlan1} />} />
        )}
        {showEditSetBudget && (
          <PopUpMain Component={<AddExpenseEdit onClose={toggleShowEditSetBudget} fetchTravelPlan={fetchTravelPlan1} data={data} selectedBudget={selectedBudget} />} />
        )}
      </div>
    </div>
  );
};

export default BudgetTravelPlan;
