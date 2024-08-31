import newRequest from '../NewRequst';

export const deleteTravelInvitationById=async(travelerInvitationId)=>{
    try {
      const response = await newRequest.delete(
        `/travelInvite/${travelerInvitationId}`,
       
      );
      return response;
    } catch (error) {
      console.error('Error fetching travel plan:', error);
      throw error;
    }
}

export const acceptTravelInvitationById=async(travelerPlanId,travelerId)=>{
  try {
    const response = await newRequest.put(
      `/travelplan/${travelerPlanId}/${travelerId}`,
     
    );
    return response;
  } catch (error) {
    console.error('Error fetching travel plan:', error);
    throw error;
  }
}


export const getTravelPlanInvitationsByUserId=async(travelerId,page=0,size=2)=>{
    try {
      const response = await newRequest.get(
        `/travelInvite/traveler/${travelerId}`,
        {
        params: {
          page,
          size,
        },
      }
      );
      return response;
    } catch (error) {
      console.error('Error fetching travel plan:', error);
      throw error;
    }
}

export const sendTravelInvitation = async (travelerPlanId, travelerId) => {
  try {
    const response=await newRequest.post(
      `/travelInvite/${travelerPlanId}/${travelerId}`,
   {
    
   }
      
    
    );
    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};
