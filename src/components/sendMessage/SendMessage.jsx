import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './SendMessage.scss'
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const SendMessage = ({ onClose, id }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    const userId = GetCurrentUserC().sub;

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
            id: id,
          },
        };
    
        try {
          const response = await newRequest.post('chat/send', messageData);
          console.log('Success:', response.data);
          setMessages([...messages, response.data]);
          setMessageContent(''); // Clear the input field
          onClose();
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div className='SendMessage'>
        <div className="closing-i" onClick={onClose}>
            <i><CloseIcon sx={{ color: '#747474', fontSize: 16 }} /></i>
        </div>
        <div className="top">
            <h1>Send Message</h1>
        </div>
        <div className="bottom">
            <form>
                <input type='text' onChange={(e) => setMessageContent(e.target.value)}/>
                <button onClick={handleMessageSubmit}>Send</button>
            </form>
        </div>
    </div>
  )
}

export default SendMessage