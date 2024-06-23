import React,{useState} from 'react';
import './CommunityPostPop.scss';

const CommunityPostPop = ({ onClose, data1 }) => {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className='CommunityPostPop' onClick={handleClick}>
      <div className="content">
        <div className="top">
          <img src={data1.profile} alt="" />
          <div className="details">
            <h4>{data1.name}</h4>
            <p>2023-01-23</p>
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
        <img className='image' src={data1.imageSrc} alt="" />
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
            <div className="cont">
                  <img src={data1.imageSrc} alt="" />
                  <div className="comment-details">
                        <h5>Robin Hood</h5>
                        <p>Absolutely breathtaking! The colors are just perfect.</p>
                  </div>
                 
            </div>
            <div className="cont">
                  <img src={data1.profile} alt="" />
                  <div className="comment-details">
                        <h5>Robin Hood</h5>
                        <p>I can't get over how cute this is! Just adorable.</p>
                  </div>
            </div>
            <div className="cont">
                  <img src={data1.imageSrc} alt="" />
                  <div className="comment-details">
                        <h5>Robin Hood</h5>
                        <p>I'm in awe of this shot! It's like I'm there in person.</p>
                  </div>
            </div>
            <div className="cont">
                  <img src={data1.profile} alt="" />
                  <div className="comment-details">
                        <h5>Robin Hood</h5>
                        <p>I can't get over how cute this is! Just adorable.</p>
                  </div>
            </div>
        </div>
        <div className="scroll">
          <i class="fa-solid fa-angles-down"></i>
          <p>Scroll</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostPop;
