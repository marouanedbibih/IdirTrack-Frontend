// axiosClient.ts

import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: `http://localhost:8085`
});

// Request interceptor to add the Authorization header
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('JWT_TOKEN');
  if (token && config.headers) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to handle specific response status codes
axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  const { response } = error;
  if (response) {
    if (response.status === 401) {
      localStorage.removeItem('JWT_TOKEN');
      // Uncomment the next line if you want to reload the window on 401 errors
      // window.location.reload();
    } else if (response.status === 404) {
      // Handle 404 errors
      // You can show a 'Not Found' message here
    }
  }
  return Promise.reject(error);
});

export default axiosClient;
