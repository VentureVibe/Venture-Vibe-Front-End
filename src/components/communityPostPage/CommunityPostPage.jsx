import React from 'react'
import './CommunityPostPage.scss'
import CommunityPost from '../communityPost/CommunityPost'
import Profile1 from '../../assets/profilepics/Profile1.jpg'
import Profile2 from '../../assets/profilepics/Profile2.jpg'
import Profile3 from '../../assets/profilepics/Profile3.jpg'
import Profile4 from '../../assets/profilepics/Profile4.jpg'
import Image1 from '../../assets/ella.jpg'
import Image2 from '../../assets/seegiriyawebp.webp'
import Image3 from '../../assets/beach.jpg'
import Image4 from '../../assets/galle.jpg'

const CommunityPostPage = ({posts}) => {
  return (
    <div className='CommunityPostPage'>
      {posts.map((post, index) => (
        <CommunityPost
          key={index} 
          profile={post.profile}
          imageSrc={post.imageSrc}
          description={post.description}
          name={post.name}
        />
      ))}
    </div>
  )
}

export default CommunityPostPage
