import {createAsyncThunk} from "@reduxjs/toolkit";
import {PostApi} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchPostsList = createAsyncThunk<PostApi[]>(
    'posts/fetch',
    async () => {
        const response = await axiosApi.get('/posts');
        return response.data;
    }
);