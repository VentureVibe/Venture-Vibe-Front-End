import React from 'react'
import './ShowAllEvents.scss'
import EventsTravelPlan from '../../components/eventsTravelPlan/EventsTravelPlan'
import MyEventListing from '../../components/myEventListing/MyEventListing'
import { eventListings } from '../../dummyData';
import EventCard from '../../components/eventCard/EventCard';

const ShowAllEvents = () => {
  return (
    <div className='showAllEvents'>
        <div className="container">
            <div className="heading-container">
                <span className='heading'>Events and Activities</span>
                <div className="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search'/>
                </div>
            </div>
            <div className="listings">
                {eventListings.map((event, index) => (
                    <EventCard key={index} img={event.imageSrc} title={event.title} price={event.price} id={event.id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ShowAllEvents