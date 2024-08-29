import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

const axiosClient = axios.create({
  baseURL: `http://13.38.108.124:8080`
});

axiosRetry(axiosClient, {
  retries: 5, // Number of retries
  retryCondition: (error: any) => {
    return error.response.status === 503; // Retry on 503 errors
  },
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Exponential backoff: 1000ms, 2000ms, 3000ms
  },
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  console.log("Token in axios: ", token);
  if (token && config.headers) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  const { response } = error;
  if (response) {
    if (response.status === 401) {
      localStorage.removeItem('JWT_TOKEN');
    } else if (response.status === 404) {
    }
  }
  return Promise.reject(error);
});

export default axiosClient;
