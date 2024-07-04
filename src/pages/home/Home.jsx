import React from 'react'
import DestinationDiv from '../../components/homepage/DestinationDiv';
import StoryDiv from '../../components/homepage/StoryDiv';
import MilestonesDiv from '../../components/homepage/MilestonesDiv';
import SubscribeDiv from '../../components/homepage/SubscribeDiv';
import Main from '../../components/homepage/Main';
import './Home.scss'

const Home = () => {
  return (
    <div className='home'>
   
    <Main />
    <DestinationDiv />
    <StoryDiv />
    <MilestonesDiv />
    <SubscribeDiv />
    </div>
  )
}

export default Home