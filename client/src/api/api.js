import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-platform-qwc6.onrender.com/api",
});

export default API;