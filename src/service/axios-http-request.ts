import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { interceptorRequest } from './axios-interceptors';

export const createInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    headers: { 'Content-Type': 'application/json' },
  });
  return interceptorRequest(instance);
};

export const get = async (
  url: string,
  params?: any,
): Promise<AxiosResponse<any>> => {
  return await createInstance().get(url, { params: { ...params } });
};
export const post = async (
  url: string,
  data?: any,
  params?: any,
): Promise<AxiosResponse<any>> => {
  return await createInstance().post(url, data, { params: { ...params } });
};
export const put = async (
  url: string,
  data?: any,
  params?: any,
): Promise<AxiosResponse<any>> => {
  return await createInstance().put(url, data, { params: { ...params } });
};

export const del = async (
  url: string,
  data?: any,
): Promise<AxiosResponse<any>> => {
  return await createInstance().delete(url, data);
};
