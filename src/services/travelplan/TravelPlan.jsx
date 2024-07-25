// src/utils/saveUser.js
import axios from 'axios';

export const saveUser = async (userData, jwtToken) => {
  try {
    const response = await axios.post(
      'http://your-backend-url/invite',
      userData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
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
