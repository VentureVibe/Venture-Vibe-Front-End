import React, { useState } from 'react'
import './MyEventListing.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PopUpMain from '../popupmain/PopUpMain';
import EditEventListing from './../editEventListing/EditEventListing';

const MyEventListing = ({ img, title, price}) => {
  const [showEdit, setShowEdit] = useState(false);

    const toggleEditPopUp = () => {
      setShowEdit(!showEdit);
    };

  return (
    <div className='myEventListing'>
        <div className="body-container">
            <img src={img} alt="" />
            <span className='title'>{title}</span>
            <span className='price'>{price}$</span>
        </div>
        <div className="icons">
            <i class="fa-regular fa-pen-to-square" onClick={toggleEditPopUp}></i>
            <i class="fa-regular fa-trash-can"></i>
        </div>
        {showEdit && (
          <PopUpMain Component={<EditEventListing onClose={toggleEditPopUp} />} />
        )}
    </div>
  )
}

export default MyEventListing