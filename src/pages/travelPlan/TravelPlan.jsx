import React from 'react'
import "./TravelPlan.scss"
import NavbarTravelplan from '../../components/navbarTravelplan/NavbarTravelplan'
import SidebarTravelPlan from '../../components/sidebarTravelPlan/SidebarTravelPlan.jsx'


const TravelPlan = () => {
  return (
    <>
        <div className='trvelplan'>
          <div className='container'>
            <div className='planning'>
              <NavbarTravelplan />
              <div className='plan-container'>
                <div className='plan-sidebar'>
                  <SidebarTravelPlan />
                </div>
                <div className='plan-list'></div>
              </div>
            </div>
            <div className='map'><h3>map</h3></div>
          </div>
        </div>
    </>
  )
}

export default TravelPlan