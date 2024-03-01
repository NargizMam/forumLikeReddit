import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentProps} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const createComment = createAsyncThunk<void, CommentProps >(
    'posts/create',
    async ({token, comment}) => {
        console.log(token, comment)
        const response =  await axiosApi.post('/comments', comment,{ headers: { Authorization: `_bearer ${token}` }});
        return response.data
    }
);