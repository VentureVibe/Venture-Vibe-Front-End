import React from 'react';
import './ShowEvent.scss';
import { event } from '../../dummyData';

const ShowEvent = () => {

  return (
    <div className="showEvent">
      <div className="wrapper">
        <div className="imgContainer">
          <div className='img-event'>
            <img src={event.img} />
          </div>
        </div>
        <div className="infoContainer">
          <h1>{event.title}</h1>
          <span>{event.des}</span>
          <span className="price"><b>${event.price}</b></span>
          <hr />
          <span>{event.sellerName}</span>
          <span>{event.contactNumber}</span>
          <span>{event.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
