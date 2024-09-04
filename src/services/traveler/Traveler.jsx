import newRequest from '../NewRequst';

export const getTraveler = async (travelerId) => {
    try {
        console.log(travelerId);
      // Make sure `newRequest` is properly configured with a base URL if needed
      const response = await newRequest.get(`/public/traveler/${travelerId}`,
        {
        
        });
  
      return response.data;
    } catch (error) {
      console.error('Error fetching traveler data:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };