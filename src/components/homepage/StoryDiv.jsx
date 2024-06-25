import './storyDiv.scss'
import React from 'react'

const StoryDiv = () => {
  return (
    <div className='story-div'>
        <div className='left-story-div'>
            <div className='column'>
            <img src='/src/assets/homepage/imagehome1.jpg' />
            <img src='/src/assets/homepage/imagehome2.jpg' />
            </div>
            <div className='column'>
            <img src='/src/assets/homepage/imagehome3.jpg' />
            <img src='/src/assets/homepage/imagehome5.jpg' />
            </div>
        </div>
        <div className='right-story-div'>
            <p className='head'>OUR SHORT STORY</p>
            <p className='para'>Our aim is to make global corporate travel management more<br />
            personalized and seamlessAnd we do this throughanetwok<br />
            of exceptional local agencies that are not only leaders in their<br />
            own respective markets..</p>
            <button>See More</button>
        </div>
    </div>
  )
}

export default StoryDiv
