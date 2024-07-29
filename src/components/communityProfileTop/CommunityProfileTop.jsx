import React, { useEffect,useState } from 'react'
import './CommunityProfileTop.scss'
import { useParams } from 'react-router-dom'
import newRequest from '../../services/NewRequst'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC'
import SendMessage from '../sendMessage/SendMessage'
import PopUpMain from '../popupmain/PopUpMain'
import ReportPost from '../reportPost/ReportPost'

const CommunityProfileTop = ({friendName="Kaveesha Weerakoon",isFriend=true}) => {
  
     let { id } = useParams();
     const [user, setUser] = useState({});
     const [follow, setFollow] = useState(false);
     const [responseMessage, setResponseMessage] = useState(true);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [sendMessage, setSendMessage] = useState(false);

     const toggleSendMessagePopUp = () => {
          setSendMessage(!sendMessage);
     };

  const userId = GetCurrentUserC().sub;

  useEffect(() => {
     newRequest.get(`public/traveler/${id}`)
       .then(response => {
          setUser(response.data);
         setLoading(false);
       })
       .catch(error => {
         console.error('There was an error!', error);
         setError('There was an error fetching the User.');
         setLoading(false);
       });

       newRequest
      .get(`following/${userId}/${id}`)
      .then((response) => {
        setFollow(response.data);
      })
      .catch((error) => {
        console.error('There was an error checking the follow status!', error);
      });
   }, [id]);

   const handleFollow = async (event) => {
     event.preventDefault();
 
     const followData = {
       traveler: {
         id: userId,
       },
       followedTraveler: {
         id: id,
       },
     };
 
     try {
       const response = await newRequest.post('following/follow', followData);
       setResponseMessage('Follow created successfully');
       console.log('Success:', response.data);
       setFollow(true);
     } catch (error) {
       console.error('Error:', error);
       setResponseMessage('Failed to follow user');
     }
   };

   const handleDelete = async (event) => {
     event.preventDefault();
 
     try {
       await newRequest.delete(`following/unfollow/${userId}/${id}`);
       setResponseMessage('Follower deleted successfully');
       console.log('Follower deleted successfully');
       setFollow(false);
     } catch (error) {
       setError('There was an error deleting the follower.');
       console.error('Error deleting follower:', error);
     }
   }


  return (
    <div className='CommunityProfileTop'>
         <img src={user.coverImg} alt="Cover" className="cover" />
         <div className="profile-section">
                        <img src={user.profileImg} alt="Profile" className="profile-image" />
                        <div className="friend-info">
                             <h2>{user.name}</h2>
                             <div className="friend-details">
                                 {!follow ? (
                                   <div className="cont-1" onClick={handleFollow}>
                                        {/* <i class="fa-solid fa-user-check"></i> */}
                                        <h4>Follow</h4>
                                   </div>
                                 ) : (
                                   <div className="cont-1" onClick={handleDelete}>
                                        {/* <i class="fa-solid fa-user-check"></i> */}
                                        <h4>Unfollow</h4>
                                   </div>
                                 )
                                 }
                                   <div className="cont-2" onClick={toggleSendMessagePopUp}>
                                      <i class="fa-brands fa-facebook-messenger"></i>
                                      <h4>Message</h4>
                                    </div>
                                   <div className="cont-3">
                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                   </div>
                              </div>
                        </div>
                         {sendMessage && (
                              <PopUpMain Component={<SendMessage onClose={toggleSendMessagePopUp} id={id}/>} />
                         )}
         </div>
    </div>
  )
}

export default CommunityProfileTop
