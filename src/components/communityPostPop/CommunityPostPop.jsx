import React,{useEffect, useState} from 'react';
import './CommunityPostPop.scss';
import noAvatar from "../../assets/noavatar.jpg";
import { format } from 'date-fns';
import newRequest from '../../services/NewRequst';

const CommunityPostPop = ({ onClose, data1, user}) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(data1.postId)

  useEffect(() => {
    newRequest.get(`comments/${data1.postId}`)
      .then(response => {
        setComments(response.data);
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

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClick = (e) => {
    e.stopPropagation(); 
  };

  const formattedDate = format(new Date(data1.createdAt), 'yyyy-MM-dd');

  //console.log(data1)

  return (
    <div className='CommunityPostPop' onClick={handleClick}>
      <div className="img-container">
        <img className='image' src={data1.imageSrc} alt="" />
      </div>
      <div className="content">
        <div className="top">
          <img src={(user.profileImg != null) ? user.profileImg : noAvatar} alt="" />
          <div className="details">
            <h4>{user.name}</h4>
            <p>{formattedDate}</p>
          </div>
          {!isPopupVisible ? (
            <i className="fa-solid fa-ellipsis" onClick={togglePopup}></i>
          ) : (
           <div className="report">
                <i className="fa-solid fa-times" onClick={togglePopup}></i>
                <span onClick={togglePopup}>Report</span>
                
          </div>
      )}
          <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        </div>
        <p class="p">
          {data1.description}
        </p>
        <div className="like-comment-count">
          <span>{data1.likes} likes</span>
          <span>{data1.comments} comments</span>
        </div>
        <hr />
        <div className="react">
         
            <div className="cont">      
               <i class="fa-regular fa-heart"></i>
               <p>Like</p>
            </div>

            <div className="cont">
               <i class="fa-regular fa-comment"></i>
               <p>Comment</p>
            </div>

        </div>
        <div className="addcomment">
        <div className="cont">
                  <img src={data1.imageSrc} alt="" />
                  <div className="comment-details">
                        <input type="text" placeholder='Add a Comment'/>
                        <div className="down">
                            <i class="fa-regular fa-paper-plane"></i>
                        </div>
                  </div>
                 
            </div>
        </div>
        <div className="comments">
          {comments.map((com, index) => (
            <div className="cont">
              <img src={(com.usercommented.profileImg == null) ? noAvatar : com.usercommented.profileImg} alt="" />
              <div className="comment-details">
                  <h5>{com.usercommented.name}</h5>
                  <p>{com.comment}</p>
              </div>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPostPop;
