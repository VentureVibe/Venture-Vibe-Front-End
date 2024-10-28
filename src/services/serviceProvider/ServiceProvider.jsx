import newRequest from '../NewRequst';

export const getTravelGuide = async (travelguideId) => {
    try {
      const response=await newRequest.get(
        `/serviceProvider/travel-guide/${travelguideId}`,
  {

  }
      );
      console.log(response.data);

      return response.data; // Return response data if you only need the data
    } catch (error) {
      console.error('Error sending travel invitation:', error);
      throw error; // Re-throw the error to handle it in the caller
    }
  };


export const updateTravelGuide = async (travelGuide) => {
    try {
      console.log(travelGuide);
      const response = await newRequest.put(
        `/serviceProvider/update-travel-guide`,
        travelGuide  // Wrap travelGuide if required
      );
  
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      console.error('Error updating travel guide:', error);
      throw error;
    }
};

export const deleteTravelGuideService=async(travelGuideServiceId)=>{
  try {
 
    const response = await newRequest.delete(
      `/travelguideservice/${travelGuideServiceId}`,
      {
        
      } 
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error updating travel guide:', error);
    throw error;
  }
}
  
export const addTravelGuideService=async(travelGuideService)=>{
  try {
 
    const response = await newRequest.post(
      `/travelguideservice`,
        travelGuideService
      
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error updating travel guide:', error);
    throw error;
  }
}
  