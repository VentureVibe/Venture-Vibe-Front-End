import "./communityFriends.scss"

import { useState } from "react";
import CommunityFriendList from "../communityFriendList/CommunityFriendList"
import CommunityFriendChat from "../communityFriendChat/CommunityFriendChat";


const CommunityFriends = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendImg, setSelectedFriendImg] = useState(null);

  const handleClickFriend = (friendName,imageSrc) => {
    setSelectedFriend(friendName);
    setSelectedFriendImg(imageSrc)
  };

  const handleClickFriends = () => {
    setSelectedFriend(null);
    setSelectedFriendImg(null);
  };

  return (
    <div className='communityFriends'>
        <div className="top">
           <h1 onClick={handleClickFriends}>Friends (5)</h1>
           <div className='nav-search'>
           <input type="text" placeholder='Search'/>
           <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        </div>
        <div className="bottom">
        {selectedFriend ? (
          <CommunityFriendChat friendName={selectedFriend} imageSrc={selectedFriendImg} />
        ) : (
          <CommunityFriendList handleClickFriend={handleClickFriend}/>

        )}
      
        </div>
     
    </div>
  )
}



export default CommunityFriends