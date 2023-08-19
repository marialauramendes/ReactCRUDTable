import { get } from './axios-http-request';

export const getAllPosts = async () => await get('posts');
