import axios from "axios";

export const API_BASE_URL = "https://api.lmscale.tech/api/v1";
// export const API_BASE_URL = "http://localhost:8080";

export const getNewAPIInstance = (URL) => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

  return axios.create({
    baseURL: URL || API_BASE_URL,
    timeout: 60000,
    headers: headers,
  });
};

export const lmScaleAPI = getNewAPIInstance(API_BASE_URL);
