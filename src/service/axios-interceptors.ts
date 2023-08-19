import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (config.method === 'post' || config.method === 'put') {
    config.data = { ...config.data };
  }
  config.params = { ...config.params };

  return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {

  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export const interceptorRequest = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onResponseError);

  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
