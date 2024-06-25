import React from 'react'
import './hotel.scss'

const Hotel = ( { image, title, name, price } ) => {
  return (
    <div className="location-div">
      <div className='img-heart'>
      <img src={image} alt={title} className="image" />
      <i className="fa-solid fa-heart heart"></i>
      </div>
    
    <div className="location-info">
      <p className="location-title">{title}</p>
      <div className='location-rating'>
        <div className='location'>
        <i class="fas fa-location-dot"></i>
        <p className="location-name">{name}</p>
        </div>
        <div className='rating'>
        <i className="fas fa-star"></i>
        <p className="hotel-price">{price}</p>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default Hotel
