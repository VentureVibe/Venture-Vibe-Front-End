import React, { useEffect, useState } from 'react'
import "./PlaceTravelPlan.scss";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { updateDestination,getDestination} from '../../services/travelDestination/TravelDestination';
import profilePic from '../../assets/profilepics/Profile2.jpg'
import PopUpMain from '../popupmain/PopUpMain';
import TravelDestinationDatePop from '../travelDestinationDate/TravelDestinationDatePop';
import AddExpenseDestination from '../addExpenseDestination/AddExpenseDestination';
import AddExpenseEdit from '../addExpenseEdit/AddExpenseEdit';

const PlaceTravelPlan = ({ placeId, color, handleRemoveFromTrip, onClick, place, travelPlan, fetchTravelPlan,delete: isDelete = true }) => {
    const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(false);
    const [description, setDescription] = useState(place.description || ''); 
    const [showEditDate , setEditDate ] = useState(false); 
    const [showBudget,setBudget]=useState(false);
    const [showEditSetBudget, setEditSetBudget] = useState(false);

     // Initialize with place description
    const toggleBottomContainer = () => {
        setIsBottomContainerVisible(prevState => !prevState);
    };

    const handleDescriptionChange = async (e) => {
        try {
            setDescription(e.target.value);
    
            const place1 = await getDestination(place.id);
    
            const updatedPlace = { ...place1, description: e.target.value };
    
            const { data } = await updateDestination(updatedPlace);
            fetchTravelPlan();
        } catch (error) {
            console.error("Error updating the destination:", error);
        }
    };

    const toggleSetEditDate  = () => {
        setEditDate (!showEditDate );
    };

    const togglesetBudget  = () => {
        setBudget(!showBudget);
    };

    const toggleShowEditSetBudget = (travelBudget) => {
        setEditSetBudget(!showEditSetBudget);
    };

    useEffect(() => {
        setDescription(place.description);
    }, [place.description]);

  return (
   
    <div className='placeTravelPlan' onClick={()=>onClick(place)} >
        <div className='show-place-container'>
                <div className="place-name">
                    <div className="icon-tag">
                        <i><LocationOnIcon sx={{ color: color, fontSize: 35 }}/></i>
                        <span style={{ backgroundColor: color }}> {isDelete && (placeId + 1)}</span> 
                    </div>
                    <p className='name' onClick={toggleBottomContainer}>{place.name}</p>
                    <div>
                    {place.date ? (
                      <div className="date" onClick={toggleSetEditDate}>
                        <i className="fa-regular fa-calendar-check"></i>
                        <p>Added</p>
                      </div>
                    ) : (
                      <div className="date" onClick={toggleSetEditDate}>
                         <i className="fa-regular fa-calendar-plus"></i>
                         <p>add</p>
                     </div>
                    )}
                </div>


                    <div className="added-by">
                        <img src={place.traveler.profileImg} alt="" />
                     
                    </div>
                        {isDelete && (
                            <i className='delete' onClick={() => handleRemoveFromTrip(place.id)}>
                              <DeleteIcon sx={{ color: '#747474', fontSize: 20 }} />
                            </i>
                        )}        
                    </div>
                {isBottomContainerVisible && (<div className="add-notes">
                    <div className="add-notes">
                        <input
                            type="text"
                            value={description}
                            placeholder='Add notes, links, etc. here'
                            onChange={handleDescriptionChange}
                        />
                    </div>
                 </div>)
                }
                {isBottomContainerVisible && (<div className="bottom-show-place">
                    
                    <div className="add-cost">
                        <i><AttachMoneyIcon sx={{ color: '#414143', fontSize: 18 }}/></i>
                        <span>
    {place.travelBudget && place.travelBudget.cost != null ? (
        <>
            {`Cost: ${place.travelBudget.cost}`}
            <i className="fa-solid fa-pen" onClick={toggleShowEditSetBudget}></i>
        </>
    ) : (
        <span onClick={setBudget}>Add cost</span>
    )}
</span>

                    </div>
                </div>)
                }
        </div>
        {showEditDate && (
          <PopUpMain Component={<TravelDestinationDatePop onClose={toggleSetEditDate} placeDates={place.travelDates} place={place}  travelPlan={travelPlan} fetchTravelPlan={fetchTravelPlan} />} />
        )}
         {showBudget && (
          <PopUpMain Component={<AddExpenseDestination onClose={ togglesetBudget }   fetchTravelPlan={fetchTravelPlan} data={travelPlan} place={place}  />} />
        )}
           {showEditSetBudget && (
          <PopUpMain Component={<AddExpenseEdit onClose={toggleShowEditSetBudget}   fetchTravelPlan={fetchTravelPlan} data={travelPlan}  selectedBudget={place.travelBudget} destinationId={place.id} />} />
        )}
    </div>
   
  )
}

export default PlaceTravelPlan