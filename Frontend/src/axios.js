//axios url
import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8081/",
  baseURL: "https://squarebot-assignment.herokuapp.com/",
});

export default instance;
