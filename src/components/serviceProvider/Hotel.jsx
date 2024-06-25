import React from 'react'
import './hotel.scss'

const Hotel = ( { image, title, name, price } ) => {
  return (
    <div className="hotel">
    <img src={image} alt={title} className="hotel-image" />
    <div className="hotel-info">
      <h2 className="hotel-title">{title}</h2>
      <p className="hotel-name">{name}</p>
      <p className="hotel-price">${price} per person</p>
    </div>
  </div>
  )
}

export default Hotel
