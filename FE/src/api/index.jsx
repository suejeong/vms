import axios from "axios";

const BASE_URL = "http://localhost:5050";
// require("dotenv").config();
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getList = async (data) => {
  const response = await axios.get(`${BASE_URL}/lists`, data);
  return response.data;
};
