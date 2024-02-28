import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectPosts, selectPostsFetching} from "./postSlice.ts";
import {useEffect} from "react";
import {fetchPostsList} from "./postThunk.ts";
import PostItem from "./components/PostItem.tsx";
import Spinner from "../../components/UI/Spinner/Loading.tsx";

const PostList = () => {
    const dispatch = useAppDispatch();
    const postsLIst = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsFetching);

    useEffect(() => {
        dispatch(fetchPostsList());
    }, []);
    let allPostsLIst = postsLIst.map(post => (
        <PostItem
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.user.username}
            image={post.image}
            createdAt={post.createdAt}
        />
    ));
    return (
        <>
            {loading ? <Spinner/> :allPostsLIst}
        </>
    );
};

export default PostList;