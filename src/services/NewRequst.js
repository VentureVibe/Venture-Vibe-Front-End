import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  withCredentials: true,
});

export default newRequest;