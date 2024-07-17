import React, { useState } from 'react';
import './CommunityPostPublish.scss';
import image from '../../assets/man.jpg';

const CommunityPostPublish = ({ onClose}) => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleOptionSelect = (option) => {
        setIsPrivate(option === 'Private');
        setDropdownVisible(false);
    };

    return (
        <div className='CommunityPostPublish'>
            <div className="cont">
                <div className="top">
                    <h3>Add post</h3>
                    <i class="fa-regular fa-circle-xmark"  onClick={onClose}></i>
                </div>
                <div className="top-detail">
                    <img src={image} alt="" />
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
                    <input type="text" placeholder='Add a Text'/>
                </div>
                <div className="add">
                        <div className="cont">
                            <i class="fa-regular fa-image"></i>
                            <p>Add a photo</p>
                        </div>
                </div>
                <button>
                    Post
                </button>
            </div>
        </div>
    );
};

export default CommunityPostPublish;
