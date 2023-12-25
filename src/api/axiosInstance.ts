// src/api/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.TRELLO_API_URL,
  params: {
    key: process.env.TRELLO_KEY,
    token: process.env.TRELLO_OAUTH_SECRET,
  },
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
