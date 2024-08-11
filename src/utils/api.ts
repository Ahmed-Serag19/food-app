import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://upskilling-egypt.com:3006',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token so i dont have to repeat myself everytime i send a request, so im sending the token with each api request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
