import newRequest from '../NewRequst';

export const addBudget = async (travelerPlanId, budgetData) => {
  try {
    const response=await newRequest.post(
      `/travelbudget/${travelerPlanId}`,

    budgetData

      
    );
    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

export const addBudgetDestination = async (travelerPlanId,travelDestinationId ,budgetData) => {
  try {
    const response=await newRequest.post(
      `/travelbudget/${travelerPlanId}/${travelDestinationId}`,

    budgetData

      
    );
    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};


export const getBudgetsByTravelPlan = async (travelerPlanId, budgetData) => {
  try {
    const response=await newRequest.get(
      `/travelbudget/${travelerPlanId}`,
{

}

    );
    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};


export const removeBudget = async (travelerPlanId,) => {
  try {
    const response=await newRequest.delete(
      `/travelbudget/${travelerPlanId}`,

    {
      
    }

      
    );
    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

export const editBudget = async (travelerPlanId, budgetData) => {
  try {
    const response=await newRequest.put(
      `/travelbudget/${travelerPlanId}`,

    budgetData

      
    );
    return response.data; 
 
  } catch (error) {
    console.error('Error sending travel invitation:', error);
    throw error; // Re-throw the error to handle it in the caller
  }
};
