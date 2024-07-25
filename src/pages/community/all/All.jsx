import React, { useEffect, useState } from 'react'
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage';
import { posts } from '../../../dummyData';
import newRequest from '../../../services/NewRequst';

const All = () => {
  const [communityPost, setCommunityPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    newRequest.get('communityPost')
      .then(response => {
        setCommunityPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the posts.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  const limitedPost =  communityPost.slice(3, 7);

  return (
    <div>
       <CommunityPostPage posts={limitedPost}/>
       </div>
  )
}

export default All
