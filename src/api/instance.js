import axios from "axios";

export const API_BASE_URL = "https://api.lmscale.tech/v1";

// export const API_BASE_URL = "http://localhost:8080/v1";

export const getNewAPIInstance = (URL) => {
  const lm_auth_token =
    typeof window !== "undefined"
      ? localStorage.getItem("lm_auth_token")
      : null;
  const headers = lm_auth_token
    ? { Authorization: `Bearer ${lm_auth_token}` }
    : {};

  return axios.create({
    baseURL: URL || API_BASE_URL,
    timeout: 60000,
    headers: headers,
  });
};

export const lmScaleAPI = getNewAPIInstance(API_BASE_URL);
