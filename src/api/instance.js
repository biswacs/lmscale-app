import axios from "axios";

// export const API_BASE_URL = "https://api.lmscale.tech/v1"; // prod
export const API_BASE_URL = "http://localhost:8080";

export const getNewAPIInstance = (URL) => {
  const token = typeof window !== "undefined" ? localStorage.token : null;
  const headers = token
    ? { Authorization: `Bearer ${localStorage.token}` }
    : {};

  return axios.create({
    baseURL: URL || API_BASE_URL,
    timeout: 60000,
    headers: headers,
  });
};

export const lmScaleAPI = getNewAPIInstance(API_BASE_URL);
