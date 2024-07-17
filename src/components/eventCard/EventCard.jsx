import React from 'react';
import './EventCard.scss';
import { Link } from 'react-router-dom';

const EventCard = ({ img, title, price, id, location }) => {
  return (
    <div className='event'>
      <Link to={`/event/${id}`}>
        <div className="body-container">
            <img src={img} alt={title} />
            <span className='title'>{title}</span>
            <span className='location'>Location : {location}</span>
            <span className='price'>{price}$</span>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
