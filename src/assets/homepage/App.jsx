import React,{ useState } from 'react'

//import './App.scss'
import Nav from './component/homepage/Nav'
import DestinationDiv from './component/homepage/DestinationDiv';
import StoryDiv from './component/homepage/StoryDiv';
import MilestonesDiv from './component/homepage/MilestonesDiv';
import SubscribeDiv from './component/homepage/SubscribeDiv';
import Main from './component/homepage/Main';


function App() {
  return (
    <>
    <Nav />
    <Main />
    <DestinationDiv />
    <StoryDiv />
    <MilestonesDiv />
    <SubscribeDiv />
    </>
    
  )
}

export default App
