import newRequest from "../NewRequst";

const API_URL = "http://localhost:8080/api/v1/events"; // Change the URL to match your backend's URL

export const getEvents = async (page = 0, size = 5) => {
  try {
    const response = await newRequest.get(API_URL, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await newRequest.get(`${API_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${eventId}:`, error);
    throw error;
  }
};

export const createEvent = async (formData) => {
  try {
    const response = await newRequest.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// export const updateEvent = async (eventId, eventDTO) => {
//   try {
//     const response = await newRequest.put(`${API_URL}/${eventId}`, eventDTO);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating event with ID ${eventId}:`, error);
//     throw error;
//   }
// };
export const updateEvent = async (formDataObj) => {
  //console.log(formDataObj);
  //console.log(formDataObj.eventId);
  try {
    const response = await newRequest.put(API_URL, formDataObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating event with ID ${eventId}:`, error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await newRequest.delete(`${API_URL}/${eventId}`);
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    throw error;
  }
};
