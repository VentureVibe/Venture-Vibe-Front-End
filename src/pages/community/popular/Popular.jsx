import React, { useEffect, useState } from 'react';
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage';
import newRequest from '../../../services/NewRequst';
import { GetCurrentUserC } from '../../../services/user/GetCurrentUserC';

const Popular = () => {
  const [communityPost, setCommunityPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    newRequest.get('communityPost')
      .then(response => {
        const sortedPosts = response.data.sort((a, b) => b.totalLikes - a.totalLikes);
        setCommunityPost(sortedPosts);
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

  console.log(GetCurrentUserC());

  return (
    <div>
      <CommunityPostPage posts={communityPost}/>
    </div>
  );
};

export default Popular;
