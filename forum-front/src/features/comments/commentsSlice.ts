import {CommentsApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createComment, fetchPostsComments} from "./commentsThunk.ts";
import {RootState} from "../../app/store.ts";

interface CommentsState {
    postsComments: CommentsApi[];
    commentsFetching: boolean;
    commentsCreating: boolean;
    showModal: boolean;
}
const initialState: CommentsState = {
    postsComments: [],
    commentsFetching: false,
    commentsCreating: false,
    showModal: false,
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        isShowModal:(state) => {
            state.showModal = !state.showModal;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchPostsComments.pending, (state) => {
            state.commentsFetching = true;
        });
        builder.addCase(fetchPostsComments.fulfilled, (state, {payload: comments}) => {
            state.commentsFetching = false;
            state.postsComments =  comments;
        });
        builder.addCase(fetchPostsComments.rejected, (state) => {
            state.commentsFetching = false;
        });
        builder.addCase(createComment.pending, (state) => {
            state.commentsCreating = true;
        });
        builder.addCase(createComment.fulfilled, (state) => {
            state.commentsCreating = false;
        });
        builder.addCase(createComment.rejected, (state) => {
            state.commentsCreating = false;
        });
    })
});

export const commentsReducer = commentsSlice.reducer;
export const {isShowModal} = commentsSlice.actions;

export const selectPostsComments = (state: RootState) => state.comments.postsComments;
export const selectCommentsFetching = (state: RootState) => state.comments.commentsFetching
export const selectCommentsCreating = (state: RootState) => state.comments.commentsCreating;
export const selectShowModal = (state: RootState) => state.comments.showModal;