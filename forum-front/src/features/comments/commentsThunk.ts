import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentProps, CommentsApi, OnePostProps} from "../../types";
import axiosApi from "../../axiosApi.ts";


export const createComment = createAsyncThunk<void, CommentProps>(
    'comments/create',
    async ({token, comment}) => {
        try {
            const response = await axiosApi.post('/comments', comment, {headers: {Authorization: `_bearer ${token}`}});
            return response.data
        } catch (e) {
            return e;
        }

    }
);
export const fetchPostsComments = createAsyncThunk<CommentsApi[], OnePostProps>(
    'comments/fetch',
    async ({token, _id}) => {
        try {
            const response = await axiosApi.get(`/comments?post=${_id}`, {headers: {Authorization: `_bearer ${token}`}});
            return response.data;
        } catch (e) {
            return e;
        }

    }
);