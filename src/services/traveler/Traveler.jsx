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

  export const getNotifications = async (userId) => {
    try {
      const response = await newRequest.get(`/notification/user/${userId}`);
      console.log(response.data);
      return response.data; // Return the list of notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };

  export const markAllNotificationsAsRead = async (userId) => {
    try {
      const response = await newRequest.put(`/notification/user/${userId}`);
      console.log(response.data);  // Handle the response data (success message)
      return response.data; // Return success message
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      throw error; // Re-throw error to propagate it
    }
  };

  export const insertNotification = async (userId, notificationData) => {
    try {
      const response = await newRequest.post(`/notification`, notificationData);
  

      return response.data; 
    } catch (error) {
      throw error; 
    }
  };
  