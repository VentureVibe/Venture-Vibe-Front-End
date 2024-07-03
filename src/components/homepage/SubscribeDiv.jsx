import React from 'react'
import './subscribeDiv.scss'

const SubscribeDiv = () => {
  return (
    <div className='div-4'>
      <h1>SUBSCRIBE NEWSLETTER & GET<br /> THE LATEST NEWS</h1>
      <div className='input-btn'>
        <input type='text' placeholder='Enter E-mail address' />
        <button>Subscribe Now</button>
      </div>
    </div>
  )
}

export default SubscribeDiv
