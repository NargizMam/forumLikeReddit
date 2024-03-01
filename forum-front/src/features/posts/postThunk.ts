import {createAsyncThunk} from "@reduxjs/toolkit";
import {OnePostApi, OnePostProps, PostApi, PostMutation, PostsProps} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const fetchPostsList = createAsyncThunk<PostApi[]>(
    'posts/fetch',
    async () => {
        const response = await axiosApi.get('/posts');
        return response.data;
    }
);
export const fetchOnePostInfo = createAsyncThunk<OnePostApi, OnePostProps>(
    'posts/fetchOnePost',
    async ({token, _id}) => {
        const response = await axiosApi.get(`/posts/${_id}`, { headers: { Authorization: `_bearer ${token}` }});
        return response.data;
    }
);
export const createPost = createAsyncThunk<void, PostsProps>(
    'posts/create',
    async ({token, post}) => {
        const formData = new FormData();

        const keys = Object.keys(post) as (keyof PostMutation)[];
        keys.forEach(key => {
            const value = post[key];

            if (value !== null) {
                formData.append(key, value);
            }
        });
        const response =  await axiosApi.post('/posts', formData, { headers: { Authorization: `_bearer ${token}` }});
        return response.data;
    }
);