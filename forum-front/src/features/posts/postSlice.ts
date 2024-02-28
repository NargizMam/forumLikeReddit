import {PostApi} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchPostsList} from "./postThunk.ts";
import {RootState} from "../../app/store.ts";

interface PostState {
    posts: PostApi[];
    postsFetching: boolean;
}
const initialState: PostState = {
    posts: [],
    postsFetching: false
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
    }
});
export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsFetching = (state: RootState) => state.posts.postsFetching;