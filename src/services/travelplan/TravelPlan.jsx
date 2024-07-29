// src/utils/saveUser.js
import axios from 'axios';

export const saveUser = async (userData, jwtToken) => {
  try {
    console.log(userData);
    const response = await axios.post(
      'http://your-backend-url/invite',
      userData,
      {
       
      }
    );

    // Handle success response
    console.log('Invitation sent:', response.data);
    return response.data;
  } catch (error) {
    // Handle error response
    console.error('Error sending invitation:', error);
    throw error;
  }
};
