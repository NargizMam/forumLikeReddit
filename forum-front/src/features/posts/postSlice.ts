import {OnePostApi, PostApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchOnePostInfo, fetchPostsList} from "./postThunk.ts";
import {RootState} from "../../app/store.ts";

interface PostState {
    posts: PostApi[];
    onePost: OnePostApi | null;
    postsFetching: boolean;
    onePostFetching: boolean;
    postsCreating: boolean;
}
const initialState: PostState = {
    posts: [],
    onePost: null,
    postsFetching: false,
    onePostFetching: false,
    postsCreating: false,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsList.pending, (state) => {
            state.postsFetching = true;
        });
        builder.addCase(fetchPostsList.fulfilled, (state, {payload: posts}) => {
            state.postsFetching = false;
            state.posts = posts;
        });
        builder.addCase(fetchPostsList.rejected, (state) => {
            state.postsFetching = false;
        });
        builder.addCase(fetchOnePostInfo.pending, (state) => {
            state.onePostFetching = true;
        });
        builder.addCase(fetchOnePostInfo.fulfilled, (state, {payload: post}) => {
            state.onePostFetching = false;
            state.onePost = post;
        });
        builder.addCase(fetchOnePostInfo.rejected, (state) => {
            state.onePostFetching = false;
        });
        builder.addCase(createPost.pending, (state) => {
            state.postsFetching = true;
        });
        builder.addCase(createPost.fulfilled, (state) => {
            state.postsFetching = false;
        });
        builder.addCase(createPost.rejected, (state) => {
            state.postsFetching = false;
        });
    }
});
export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectOnePostInfo = (state: RootState) => state.posts.onePost;
export const selectPostsFetching = (state: RootState) => state.posts.postsFetching;
export const selectOnePostFetching = (state: RootState) => state.posts.onePostFetching;
export const selectPostsCreating = (state: RootState) => state.posts.postsCreating;
