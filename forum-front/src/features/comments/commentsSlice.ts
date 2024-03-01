import {CommentsApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost} from "../posts/postThunk.ts";
import {createComment} from "./commentsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CommentsState {
    postsComments: CommentsApi[];
    commentsCreating: boolean;
}
const initialState: CommentsState = {
    postsComments: [],
    commentsCreating: false
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(createComment.pending, (state) => {
            state.commentsCreating = true;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.commentsCreating = false;
        });
        builder.addCase(createPost.rejected, (state) => {
            state.commentsCreating = false;
        });
    })
});

export const commentsReducer = commentsSlice.reducer;

export const selectCommentsCreating = (state: RootState) => state.comments.commentsCreating;
