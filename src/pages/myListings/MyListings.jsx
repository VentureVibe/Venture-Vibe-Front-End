import React, { useState } from 'react'
import './MyListings.scss'
import EventsTravelPlan from '../../components/eventsTravelPlan/EventsTravelPlan'
import MyEventListing from '../../components/myEventListing/MyEventListing'
import { eventListings } from '../../dummyData';
import AddEventListing from '../../components/addEventListing/AddEventListing';
import PopUpMain from '../../components/popupmain/PopUpMain';

const MyListings = () => {
    const [showAddNew, setShowAddNew] = useState(false);

    const toggleAddNewPopUp = () => {
        setShowAddNew(!showAddNew);
    };

  return (
    <div className='myListings'>
        <div className="container">
            <div className="heading-container">
                <span className='heading'>My Listings</span>
                <div className="new-listing" onClick={toggleAddNewPopUp}>
                    <span>Add New</span>
                </div>
            </div>
            <div className="listings">
                {eventListings.map((event, index) => (
                    <MyEventListing key={index} img={event.imageSrc} title={event.title} price={event.price} />
                ))}
            </div>
            {showAddNew && (
                <PopUpMain Component={<AddEventListing onClose={toggleAddNewPopUp} />} />
            )}
        </div>

    </div>
  )
}

export default MyListings