import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosClient = axios.create({

  baseURL: `http://localhost:8000`


});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('JWT_TOKEN');
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
