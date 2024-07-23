// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// export const GetUser = async () => {
//     const token = localStorage.getItem("idToken");
//     const decodedToken = jwtDecode(token);
//     const email = decodedToken.email;
//     axios.post(`http://localhost:8080/api/v1/user`, {
//         params: {email}
//     })
//     .then(response => {

//     })
//     .catch(error => {
//     });
// } 

import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you use the correct import

export const GetUser = async () => {
  try {
    const token = localStorage.getItem('idToken');
    if (!token) {
      throw new Error('No token found');
    }

    const decodedToken = jwtDecode(token);
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
