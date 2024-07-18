import React from 'react'
import './ShowAllTravelGuides.scss'
import EventsTravelPlan from '../../components/eventsTravelPlan/EventsTravelPlan'
import MyEventListing from '../../components/myEventListing/MyEventListing'
import { guides } from '../../dummyData';
import EventCard from '../../components/eventCard/EventCard';
import GuideCard from '../../components/guideCard/GuideCard';

const ShowAllTravelGuides = () => {
  return (
    <div className='showAllTravelGuides'>
        <div className="container">
            <div className="heading-container">
                <span className='heading'>Travel Guides</span>
                <div className="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search'/>
                </div>
            </div>
            <div className="listings">
                {guides.map((guide, index) => (
                    <GuideCard key={index} img={guide.imageSrc} name={guide.name} price={guide.price} location={guide.location} contactNumber={guide.contactNumber} id={guide.id}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ShowAllTravelGuides