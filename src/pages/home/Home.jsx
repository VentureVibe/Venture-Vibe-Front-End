import React, { useEffect } from 'react'
import DestinationDiv from '../../components/homepage/DestinationDiv';
import StoryDiv from '../../components/homepage/StoryDiv';
import MilestonesDiv from '../../components/homepage/MilestonesDiv';
import SubscribeDiv from '../../components/homepage/SubscribeDiv';
import Main from '../../components/homepage/Main';
import './Home.scss'
import { useAlert } from '../../components/errAlert/AlertContext';
import { exchangeCodeForTokens } from '../../services/user/LoginSignup';

const Home = () => {
  const showAlert = useAlert();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      try {
        exchangeCodeForTokens(code);
      } catch (error) {
        showAlert('Error exchanging code for tokens', 'error');
      }
    }
  })

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