import React from 'react'
import CommunityPostPage from '../../../../components/communityPostPage/CommunityPostPage'
import { posts } from '../../../../dummyData';

const ProfilePopular = () => {

  const limitedPost =  posts.slice(2, 8);

  return (
    <div>
         <CommunityPostPage posts={limitedPost}/>
    </div>
  )
}

export default ProfilePopular
