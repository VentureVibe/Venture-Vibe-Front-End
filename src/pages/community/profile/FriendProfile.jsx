import React, { useEffect, useState }  from 'react'
import './FriendProfile.scss'
import CommunityProfileTop from '../../../components/communityProfileTop/CommunityProfileTop'
import { Link, Outlet } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CommunityPostPage from '../../../components/communityPostPage/CommunityPostPage'
import newRequest from '../../../services/NewRequst'
import { GetCurrentUserC } from '../../../services/user/GetCurrentUserC'


const FriendProfile = () => {
  let { id } = useParams();

  const [communityPost, setCommunityPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = GetCurrentUserC().sub;

  useEffect(() => {
    newRequest.get(`communityPost/user/${id}`)
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

  const limitedPost = communityPost.slice(0, 4);

  return (
    <div className='FriendProfile'>
        <CommunityProfileTop/>
   
        <div className="bottom">
              <div className="top">
                 <h1>Recent Posts</h1>
                  {/* <div className="right">
                      <Link to={`/community/profile/${id}`}><p>All</p></Link>
                      <Link to={`/community/profile/popular/${id}`}><p>Popular</p></Link>
                  </div> */}
              </div>
             <div className="bottom">
              <CommunityPostPage posts={limitedPost} />
             </div>
        </div>
    </div>
  )
}

export default FriendProfile
