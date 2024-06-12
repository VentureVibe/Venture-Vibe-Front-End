import React from 'react'
import "./SidebarTravelPlan.scss"

const SidebarTravelPlan = () => {
  return (
    <div className='sidebar'>
        <div className='container'>
            <div className='sidebar-item'>
                <i>{'> '}</i>
                <span> Overview</span>
            </div>
            <div className='sidebar-item'>
                <i>{'> '}</i>
                <span> Itinerary</span>
            </div>
            <div className='sidebar-item'>
                <i>{'> '}</i>
                <span> Budget</span>
            </div>
        </div>
    </div>
  )
}

export default SidebarTravelPlan