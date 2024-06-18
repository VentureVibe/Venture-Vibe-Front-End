import React from 'react'
import "./Feeds.scss";
import CommunityPost from '../../../components/communityPost/CommunityPost';
import Profile1 from '../../../assets/profilepics/Profile1.jpg'
import Profile2 from '../../../assets/profilepics/Profile2.jpg'
import Profile3 from '../../../assets/profilepics/Profile3.jpg'
import Profile4 from '../../../assets/profilepics/Profile4.jpg'
import Image1 from '../../../assets/ella.jpg'
import Image2 from '../../../assets/seegiriyawebp.webp'
import Image3 from '../../../assets/beach.jpg'
import Image4 from '../../../assets/galle.jpg'

const Feeds = () => {
  return (
    <div className='Feeds'>
        <CommunityPost profile={Profile1} imageSrc={Image1} description="I just returned from an amazing trip to Ella! The scenic views and charming atmosphere made it an unforgettable experience. 🌄✨ #Ella #TravelDiaries" name="Himasha Ravishaka"/>
        <CommunityPost profile={Profile2} imageSrc={Image2} description="Just returned from Sigiriya! The ancient fortress and breathtaking views were unforgettable. 🏰🌿 #Sigiriya #TravelMagic"/>
        <CommunityPost profile={Profile3} imageSrc={Image3} description="Just returned from Nilaveli! The pristine beaches and serene atmosphere made it a perfect getaway. 🏖️🌊 #Nilaveli #TravelBliss" name="Akila Buwaneka"/>
        <CommunityPost profile={Profile4} imageSrc={Image4} description="Just got back from an incredible journey to Galle! The historic fort, beautiful beaches, and vibrant culture made it a trip to remember. 🏰🌊✨ #Galle #TravelAdventures" name="Rashmika Guruge"/>
        <CommunityPost />

    </div>
  )
}

export default Feeds
