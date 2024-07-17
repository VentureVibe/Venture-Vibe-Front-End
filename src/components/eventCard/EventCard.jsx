import React from 'react';
import './EventCard.scss';
import { Link } from 'react-router-dom';

const EventCard = ({ img, title, price, id }) => {
  return (
    <div className='event'>
      <Link to={`/event/${id}`}>
        <div className="body-container">
            <img src={img} alt={title} />
            <span className='title'>{title}</span>
            <span className='price'>{price}$</span>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
