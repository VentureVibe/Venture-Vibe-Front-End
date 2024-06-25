import './milestone.scss'

import React from 'react'

const Milestone = ( { name, role, des } ) => {
  return (
    <div className='milestone'>
      <div className='profile'>
        <img src='/src/assets/homepage/imageman.jpeg' />
        <div className='name-role'>
            <p>{name}</p>
            <p>{role}</p>
        </div>
      </div>
      <div className='para'>
        <p>{des}</p>
      </div>
    </div>
  )
}

export default Milestone
