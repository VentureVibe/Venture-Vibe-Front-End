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