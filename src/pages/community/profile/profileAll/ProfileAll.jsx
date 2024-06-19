import React from 'react'
import CommunityPostPage from '../../../../components/communityPostPage/CommunityPostPage'
import { posts } from '../../../../dummyData';

const ProfileAll = () => {

  const limitedPost =  posts.slice(3, 6);

  return (
    <div>
         <CommunityPostPage posts={limitedPost}/>
    </div>
  )
}

export default ProfileAll
