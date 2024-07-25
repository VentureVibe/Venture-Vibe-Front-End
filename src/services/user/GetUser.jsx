import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you use the correct import
import { GetCurrentUserC } from './GetCurrentUserC';

export const GetUser = async () => {
  try {
    const token = localStorage.getItem('idToken');
    if (!token) {
      throw new Error('No token found');
    }

    //const decodedToken = jwtDecode(token);
    const decodedToken = GetCurrentUserC();
    const email = decodedToken.email;

    // Make a GET request to fetch user details by email
    const response = await axios.get('http://localhost:8080/api/v1/user', {
      params: { email } // Send email as a query parameter
    });

    // Return the user response
    return response.data;

  } catch (error) {
    console.error('Error fetching user:', error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};
