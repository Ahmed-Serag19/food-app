import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://upskilling-egypt.com:3006',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
