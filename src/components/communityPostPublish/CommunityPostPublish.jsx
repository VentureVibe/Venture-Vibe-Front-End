import React, { useState } from 'react';
import './CommunityPostPublish.scss';
import image1 from '../../assets/man.jpg';
import newRequest from '../../services/NewRequst';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import { useNavigate } from 'react-router-dom';

const CommunityPostPublish = ({ onClose }) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionSelect = (option) => {
    setIsPrivate(option === 'Private');
    setDropdownVisible(false);
  };

  const userId = GetCurrentUserC().sub;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const communityPost = JSON.stringify({
      content,
      userId: userId
    });

    formData.append('communityPost', communityPost);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await newRequest.post('communityPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponseMessage('Post created successfully');
      console.log('Success:', response.data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Failed to create post');
    }
  };

  return (
    <div className='CommunityPostPublish'>
      <div className="cont">
        <div className="top">
          <h3>Add post</h3>
          <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
        </div>
        <div className="top-detail">
          <img src={image1} alt="User" />
          <div className="top-right">
            <h1>Kaveesha Weerakoon</h1>
            <button onClick={toggleDropdown}>
              {isPrivate ? 'Private' : 'Public'}
              <i className="fa-solid fa-sort-down"></i>
            </button>
            {dropdownVisible && (
              <div className="dropdown">
                <div onClick={() => handleOptionSelect('Public')}>
                  Public
                </div>
                <div onClick={() => handleOptionSelect('Private')}>
                  Private
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="input">
          <input
            type="text"
            placeholder='Add a Text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="add">
          <div className="cont">
            <i className="fa-regular fa-image"></i>
            <p>Add a photo</p>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>
          Post
        </button>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
};

export default CommunityPostPublish;
