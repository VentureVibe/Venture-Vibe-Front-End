import React from 'react'
import "./SidebarTravelPlan.scss"
import SidebarTravelPlanExtend from '../sidebarTravelPlanExtend/SidebarTravelPlanExtend'

const SidebarTravelPlan = () => {
    const overview = ["Explore", "Notes", "Hotels and Logging", "Places to visit", "Restaurants", "Activities", "Transportation"]
    const itinerary = ["Sun 1/6", "Mon 2/6", "Tue 3/6", "Wed 4/6", "Thu 5/6", "Fri 6/6", "Sat 7/6"]
    const budget = ["view"]
  return (
    <div className='sidebar'>
        <div className='container'>
            <div className='sidebar-item-tab'>
                <div className='sidebar-item-select'>
                    <i>{'>'}</i>
                    <span>Overview</span>
                </div>
                <SidebarTravelPlanExtend items={overview}/>
            </div>
            <div className='sidebar-item-tab'>
                <div className='sidebar-item-select'>
                    <i>{'>'}</i>
                    <span>Itinerary</span>
                </div>
                <SidebarTravelPlanExtend items={itinerary}/>
            </div>
            <div className='sidebar-item-tab'>
                <div className='sidebar-item-select'>
                    <i>{'>'}</i>
                    <span>Budget</span>
                </div>
                <SidebarTravelPlanExtend items={budget}/>
            </div>
        </div>
    </div>
  )
}

export default SidebarTravelPlan