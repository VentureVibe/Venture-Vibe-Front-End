import React, { useEffect, useState } from 'react';
import './EditProfile.scss';
import man from '../../assets/man.jpg';
import { GetCurrentUserC } from '../../services/user/GetCurrentUserC';
import newRequest from '../../services/NewRequst';

const EditProfile = () => {
    const [passwordContainer, setPasswordContainer] = useState(false);
    const [userCurrent, setUserCurrent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        profileImg: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null); // Hold the new profile image or URL
    const userId = GetCurrentUserC().sub;

    useEffect(() => {
        // Fetch current user details
        newRequest
          .get(`public/traveler/${userId}`)
          .then((response) => {
            setUserCurrent(response.data);
            setImage(response.data.profileImg || man); // Set initial image or fallback
          })
          .catch((error) => {
            console.error('There was an error!', error);
            setError('There was an error fetching the user.');
          });
      }, [userId]);

    const handleChange = (e) => {
        setUserCurrent({
            ...userCurrent,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Update image state with new file
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Create a FormData object to send image and other data
        const formData = new FormData();
        formData.append('firstName', userCurrent.firstName);
        formData.append('lastName', userCurrent.lastName);
        formData.append('email', userCurrent.email);
        formData.append('country', userCurrent.country);
        if (image && typeof image !== 'string') {
            formData.append('profileImg', image); // Only append if image is a file object
        }

        // API request to update traveler details
        newRequest
          .put(`public/traveler/${userId}`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          })
          .then((response) => {
            console.log('User updated successfully', response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error updating user', error);
            setError('There was an error updating the user.');
            setLoading(false);
          });
    };

    return (
        <div className='editProfile'>
            <h1>Edit Profile</h1>
            {error && <div className="error">{error}</div>}
            <div className="profile-container">
                <div className="profile-pic">
                    <img 
                        src={userCurrent.profileImg} 
                        alt="Profile" 
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="change-photo"
                    />
                </div>
                <form onSubmit={handleSubmit} className="profile-details-container">
                    <div className="name">
                        <div className="first-name">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userCurrent.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="last-name">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userCurrent.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="email-container">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userCurrent.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="country">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={userCurrent.country}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="button"
                        className='change-password'
                        onClick={() => setPasswordContainer(true)}
                    >
                        Change Password
                    </button>

                    {passwordContainer && (
                        <div className="change-password-container">
                            <div className="new-password">
                                <label htmlFor="newPassword">New Password</label>
                                <input type="password" id="newPassword" />
                            </div>
                            <div className="confirm-password">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" />
                            </div>
                        </div>
                    )}

                    <button type="submit" className='submit' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
