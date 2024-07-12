import React from 'react'
import './MyListings.scss'
import EventsTravelPlan from '../../components/eventsTravelPlan/EventsTravelPlan'
import MyEventListing from '../../components/myEventListing/MyEventListing'
import { eventListings } from '../../dummyData';

const MyListings = () => {
  return (
    <div className='myListings'>
        <div className="container">
            <div className="heading-container">
                <span className='heading'>My Listings</span>
                <div className="new-listing">
                    <span>Add New</span>
                </div>
            </div>
            <div className="listings">
                {eventListings.map((event, index) => (
                    <MyEventListing key={index} img={event.imageSrc} title={event.title} price={event.price} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyListings