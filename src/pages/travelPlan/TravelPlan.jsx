import React from 'react'
import "./TravelPlan.scss"
import NavbarTravelplan from '../../components/navbarTravelplan/NavbarTravelplan'
import SidebarTravelPlan from '../../components/sidebarTravelPlan/SidebarTravelPlan.jsx'
import galle from '../../assets/galle.jpg'
import TripToTravelPlan from '../../components/tripToTravelPlan/TripToTravelPlan.jsx'
import ExploreTravelPlan from '../../components/exploreTravelPlan/ExploreTravelPlan.jsx'


const TravelPlan = () => {
  return (
    <>
        <div className='trvelplan'>
          <div className='container'>
            <div className='planning'>
              <NavbarTravelplan />
              <hr />
              <div className='plan-container'>
                <div className='plan-sidebar'>
                  <SidebarTravelPlan />
                </div>
                <div className='plan-list-container'>
                  <div className='plan-list'>
                    <img src={galle} alt="" />
                    <TripToTravelPlan />
                  </div>
                  <ExploreTravelPlan />
                </div>
                
              </div>
            </div>
            <div className='map'><h3>map</h3></div>
          </div>
        </div>
    </>
  )
}

export default TravelPlan