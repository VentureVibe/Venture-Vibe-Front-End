import "./communityFriends.scss"

import { useState } from "react";
import CommunityFriendList from "../communityFriendList/CommunityFriendList"
import CommunityFriendChat from "../communityFriendChat/CommunityFriendChat";


const CommunityFriends = () => {
  
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFriendImg, setSelectedFriendImg] = useState(null);
  const [selectedFriendId, setselectedFriendId] = useState(null);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const handleClickFriend = (friendName,imageSrc,selectedFriendId, conversationId) => {
    console.log(selectedFriendId);
    setSelectedFriend(friendName);
    setSelectedFriendImg(imageSrc);
    setselectedFriendId(selectedFriendId);
    setSelectedConversationId(conversationId);
  };

  const handleClickFriends = () => {
    setSelectedFriend(null);
    setSelectedFriendImg(null);
    setselectedFriendId(null);
  };

  return (
    <div className='communityFriends'>
        <div className="top">
           <h1 onClick={handleClickFriends}>Chat</h1>
           <div className='nav-search'>
           <input type="text" placeholder='Search'/>
           <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        </div>
        <div className="bottom">
        {selectedFriend ? (
          <CommunityFriendChat friendName={selectedFriend} imageSrc={selectedFriendImg} friendId={selectedFriendId} conversationId={selectedConversationId}/>
        ) : (
          <CommunityFriendList handleClickFriend={handleClickFriend}/>

        )}
      
        </div>
     
    </div>
  )
}



export default CommunityFriends