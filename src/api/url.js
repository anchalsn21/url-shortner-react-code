import axios from "axios";
import { BaseUrl } from "../utils/config";

export const createUrl = (data) => {
  try {
    return axios.post(`${BaseUrl}/create-short-url`, data);
  } catch (error) {
    console.error(error);
  }
};
