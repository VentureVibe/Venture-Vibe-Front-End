import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GetCurrentUserC } from "./GetCurrentUserC";

export const GetUser = async () => {
  try {
    const token = localStorage.getItem("idToken");
    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = GetCurrentUserC();
    const email = decodedToken.email;
    const id = decodedToken.sub;

    const response = await axios.get(
      `http://localhost:8080/api/v1/public/traveler/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw error;
  }
};
