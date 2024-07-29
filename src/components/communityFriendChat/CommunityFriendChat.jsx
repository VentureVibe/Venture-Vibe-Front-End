import React, { useEffect, useState } from 'react';
import './communityFriendChat.scss';
import profile from '../../assets/man.jpg';
import { Link } from 'react-router-dom';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const CommunityFriendChat = ({ friendName, imageSrc, friendId, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageContent, setMessageContent] = useState('');

  const userId = GetCurrentUserC().sub;

  useEffect(() => {
    newRequest.get(`chat/messages/${conversationId}`)
      .then(response => {
        setMessages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError('There was an error fetching the Messages.');
        setLoading(false);
      });
  }, [conversationId]);

  const handleMessageSubmit = async (event) => {
    event.preventDefault();

    if (!messageContent.trim()) {
      return; // Don't send empty messages
    }

    const messageData = {
      content: messageContent,
      sender: {
        id: userId,
      },
      recipient: {
        id: friendId,
      },
    };

    try {
      const response = await newRequest.post('chat/send', messageData);
      console.log('Success:', response.data);
      setMessages([...messages, response.data]);
      setMessageContent(''); // Clear the input field
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="CommunityFriendChat">
      <Link to={`/community/profile/${friendId}`}>
        <div className="detail">
          <img src={imageSrc || profile} alt="" />
          <h2>{friendName}</h2>
        </div>
      </Link>
      <div className="chat">
        {messages.map((message, index) => (
          message.sender.id === userId ? (
            <div key={index} className="component-2">
              <p>{message.content}</p>
              <img src={message.sender.profileImg} alt="" />
            </div>
          ) : (
            <div key={index} className="component-1">
              <img src={message.sender.profileImg} alt="" />
              <p>{message.content}</p>
            </div>
          )
        ))}
      </div>
      <div className="input">
        <i className="fa-regular fa-face-smile"></i>
        <input
          type="text"
          placeholder="Chat now!"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <i className="fa-solid fa-paper-plane" onClick={handleMessageSubmit}></i>
      </div>
    </div>
  );
};

export default CommunityFriendChat;
