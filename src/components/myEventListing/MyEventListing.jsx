import React from 'react'
import './MyEventListing.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MyEventListing = ({ img, title, price}) => {
  return (
    <div className='myEventListing'>
        <div className="body-container">
            <img src={img} alt="" />
            <span className='title'>{title}</span>
            <span className='price'>{price}$</span>
        </div>
        <div className="icons">
            <i class="fa-regular fa-pen-to-square"></i>
            <i class="fa-regular fa-trash-can"></i>
        </div>
    </div>
  )
}

export default MyEventListing