import React from 'react'
import "./Feeds.scss";
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage';
import { posts } from '../../../dummyData';

const Feeds = () => {

  const limitedPost =  posts.slice(0, 4);
  
  return (
       <CommunityPostPage posts={limitedPost}/>
  )
}

export default Feeds
