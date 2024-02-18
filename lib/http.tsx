import axios from "axios";

const apiUrl = process.env.endpoint || "http://backend-classer-env.eba-hq9mhwvp.il-central-1.elasticbeanstalk.com";
export const createUrl = (endpoint: string) => apiUrl + endpoint;

export const postData = async (url: string, data: any, errorMessage: string) => {
  try {
    const response = await post(createUrl(url), data);

    console.log("responsee", response);
    if (!response?.data) {
      console.error(errorMessage);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    return null;
  }
};

export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
