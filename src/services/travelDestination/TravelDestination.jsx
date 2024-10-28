import newRequest from '../NewRequst';

export const addDestination= async (travelerPlanId, destinationData) => {
    try {
   
      const response=await newRequest.post(
        `/traveldestination/${travelerPlanId}`,
        destinationData   
        
      );

      return response.data; // Return response data if you only need the data
    } catch (error) {
      console.error('Error sending travel invitation:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };
  

export const updateDestination= async (destinationData) => {
    try {
      console.log("destination data" + destinationData.description);
      const response=await newRequest.put(
        `/traveldestination`,
        destinationData   
        
      );

      return response.data; // Return response data if you only need the data
    } catch (error) {
      console.error('Error sending travel invitation:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
};

export const getDestination= async (id) => {
  try {
   
    const response=await newRequest.get(
      `/traveldestination/${id}`,
      {
        
      }
      
    );

    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};


  

export const deleteDestination= async (id) => {
  try {
  
    const response=await newRequest.delete(
      `/traveldestination/${id}`,
      {
        
      }
      
    );

    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};




