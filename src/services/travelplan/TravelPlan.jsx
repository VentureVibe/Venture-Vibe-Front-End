import newRequest from '../NewRequst'; // Adjust the path to where newRequest is located

export const saveTravelPlan = async (userData, jwtToken,userId) => {
  try {
   
    const response = await newRequest.post(
      `/travelplan/${userId}`, 
      userData,
      {
      
      }
    );

    return response.data;
  } catch (error) {
    // Handle error response
    console.error('Error sending invitation:', error);
    throw error;
  }
};



export const getTravelerByEmailPartially = async (email, jwtToken) => {
  try {
  
    const response = await newRequest.get(
      `/public/traveler/emailpartially/${email}` ,
      email,
      {
      
      }
    
    );
    const extractedData = response.data.map(traveler => ({
      email: traveler.email,
      id: traveler.id
    }));
    return extractedData;
  } catch (error) {
    console.error('Error sending invitation:', error);
    throw error;
  }
};



export const getTravelPlanById = async (travelPlanId, travelerId) => {
  try {
    const response = await newRequest.get(
      `/travelplan/${travelPlanId}/${travelerId}`
    
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching travel plan:', error);
    throw error;
  }
};


export const getOwnedTravelPlansByUser=async(travelerId,page=0,size=2)=>{
  try {
    const response = await newRequest.get(
      `/travelplan/owned/${travelerId}`,
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

export const getAcceptedTravelPlansByUser=async(travelerId,page=0,size=2)=>{
  try {
    const response = await newRequest.get(
      `/travelplan/accepted/${travelerId}`,
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

export const deleteTravelPlanById=async(travelerPlanId)=>{
  try {
    const response = await newRequest.delete(
      `/travelplan/${travelerPlanId}`,
     
    );
    return response;
  } catch (error) {
    console.error('Error fetching travel plan:', error);
    throw error;
  }
}

export const leaveTravelPlan=async(travelerPlanId,travelerId)=>{
  try {

    const response = await newRequest.delete(
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

export const addNoteToTravelPlan = async (travelPlanId, note) => {
  try {
    const response = await newRequest.put(
      `/travelplan/note/${travelPlanId}`,
      null, // No body, so pass `null`
      { params: { note } } // Query params
    );
    return response;
  } catch (error) {
    console.error('Error adding note to travel plan:', error);
    throw error;
  }
};


export const addBudgetToTravelPlan = async (travelPlanId, budget) => {
  try {
    const response = await newRequest.put(
      `/travelplan/budget/${travelPlanId}`,
      null, // No body, so pass `null`
      { params: { budget } } // Query params
    );
    return response;
  } catch (error) {
    console.error('Error adding note to travel plan:', error);
    throw error;
  }
};
