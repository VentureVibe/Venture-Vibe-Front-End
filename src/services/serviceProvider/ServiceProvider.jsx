import newRequest from "../NewRequst";

export const getTravelGuide = async (travelguideId) => {
  try {
    const response = await newRequest.get(
      `/serviceProvider/travel-guide/${travelguideId}`,
      {}
    );
    console.log(response.data);

    return response.data; // Return response data if you only need the data
  } catch (error) {
    console.error("Error sending travel invitation:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

export const updateTravelGuide = async (travelGuide) => {
  try {
    console.log(travelGuide);
    const response = await newRequest.put(
      `/serviceProvider/update-travel-guide`,
      travelGuide // Wrap travelGuide if required
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating travel guide:", error);
    throw error;
  }
};

export const deleteTravelGuideService = async (travelGuideServiceId) => {
  try {
    const response = await newRequest.delete(
      `/travelguideservice/${travelGuideServiceId}`,
      {}
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating travel guide:", error);
    throw error;
  }
};

export const addTravelGuideService = async (travelGuideService) => {
  try {
    const response = await newRequest.post(
      `/travelguideservice`,
      travelGuideService
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating travel guide:", error);
    throw error;
  }
};

export const getTravelGuides = async () => {
  try {
    const response = await newRequest.get("/serviceProvider/travel-guides");

    // Assuming you want to return the data from the response
    return response.data;
  } catch (error) {
    console.error("Error fetching travel guides:", error);

    // Optionally, handle error response if needed
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(
        `Error fetching travel guides: ${error.response.data.message}`
      );
    } else {
      throw new Error("Error fetching travel guides.");
    }
  }
};
