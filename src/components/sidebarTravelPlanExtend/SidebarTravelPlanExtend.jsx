import React from 'react'
import "./SidebarTravelPlanExtend.scss"

const SidebarTravelPlanExtend = ({items}) => {
  return (
    <div className='sidebarTravelPlanOverview'>
        <div className='container'>
            {items.map((item, index) => (
                <div className='sidebar-item-overview'>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SidebarTravelPlanExtend