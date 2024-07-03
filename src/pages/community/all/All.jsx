import React from 'react'
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage';
import { posts } from '../../../dummyData';

const All = () => {
  
  const limitedPost =  posts.slice(4, 7);

  return (
    <div>
       <CommunityPostPage posts={limitedPost}/>
       </div>
  )
}

export default All
