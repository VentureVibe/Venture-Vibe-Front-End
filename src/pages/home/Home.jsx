import React from 'react'
import DestinationDiv from '../../components/homepage/DestinationDiv';
import StoryDiv from '../../components/homepage/StoryDiv';
import MilestonesDiv from '../../components/homepage/MilestonesDiv';
import SubscribeDiv from '../../components/homepage/SubscribeDiv';
import Main from '../../components/homepage/Main';

const Home = () => {
  return (
    <>
    {/*<Nav />*/}
    <Main />
    <DestinationDiv />
    <StoryDiv />
    <MilestonesDiv />
    <SubscribeDiv />
    </>
  )
}

export default Home