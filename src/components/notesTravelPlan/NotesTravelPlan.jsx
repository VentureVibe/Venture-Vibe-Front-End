import React, { useState, useEffect } from 'react';
import './NotesTravelPlan.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useParams } from 'react-router-dom'; 
import { addNoteToTravelPlan } from '../../services/travelplan/TravelPlan'; 

const NotesTravelPlan = ({ fetchTravelPlan, data }) => {
  const [isBottomContainerVisible, setIsBottomContainerVisible] = useState(true);
  const [note, setNote] = useState(''); // Initially set to an empty string

  const { id } = useParams(); 

  // Set the note when the data is available
  useEffect(() => {
    if (data && data.note) {
      setNote(data.note); // Set the note from data once data is available
    }
  }, [data]); // Dependency on `data` to trigger when it changes

  const toggleBottomContainer = () => {
    setIsBottomContainerVisible(prevState => !prevState);
  };

  // Handle the note change
  const handleNoteChange = (e) => {
    const updatedNote = e.target.value;
    setNote(updatedNote);

    // Update note in the backend
    addNoteToTravelPlan(id, updatedNote)
      .then(() => {
        fetchTravelPlan(); // Refresh travel plan after note update
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  return (
    <div className='notesTravelPlan' id='notes'>
      <div className='container'>
        <div className='top-container' onClick={toggleBottomContainer}>
          <i><KeyboardArrowDownIcon sx={{ color: '#747474' }}/></i>
          <h2>Notes</h2>
        </div>
        {isBottomContainerVisible && (
          <div className='bottom-container'>
            <textarea
              name="note"
              id="note"
              placeholder='Write or paste anything here. How to get around, tips, and tricks'
              value={note} // Bind the textarea value to the state
              onChange={handleNoteChange} // Call handleNoteChange on each keystroke
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesTravelPlan;
