import { PostType } from '../types';
import { get, post, put, del } from './axios-http-request';

export const getAllPosts = async () => await get('posts');

export const createNewPost = async (data: PostType) => await post('posts', data);

export const editPost = async (postId: number, data: PostType) => await put(`posts/${postId}`, data);

export const deletePost = async (postId: number,) => await del(`posts/${postId}`);
