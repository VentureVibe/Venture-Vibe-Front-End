import React, { useEffect, useState } from 'react';
import './Feeds.scss';
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage';
import newRequest from '../../../services/NewRequst';

const Feeds = () => {
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

  console.log(communityPost.createdAt);

  const limitedPost = communityPost.slice(1, 5);

  return (
    <CommunityPostPage posts={limitedPost} />
  );
};

export default Feeds;
