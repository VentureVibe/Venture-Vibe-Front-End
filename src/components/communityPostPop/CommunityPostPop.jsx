import React from 'react'
import './CommunityPostPop.scss'

const CommunityPostPop = (onClose, data) => {
  const { name, likes, comments, description, imageSrc, profile } = data;
  console.log(data)
  return (
    <div className='CommunityPostPop'>
         <div className="content">
           
         </div>
    </div>
  )
}

export default CommunityPostPop
