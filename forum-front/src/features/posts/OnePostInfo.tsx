import {Button, CircularProgress, Grid, Paper, Typography} from "@mui/material";
import {useEffect} from "react";
import dayjs from "dayjs";
import {fetchOnePostInfo} from "./postThunk.ts";
import {useParams} from "react-router-dom";
import {selectOnePostFetching, selectOnePostInfo} from "./postSlice.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Loading from "../../components/UI/Spinner/Loading.tsx";
import imageNotAvailable from "../../assets/images/noImage.png";
import {apiURL} from "../../constants.ts";
import ModalWindow from "../../components/UI/Modal/ModalWindow.tsx";
import {isShowModal, selectCommentsFetching, selectPostsComments} from "../comments/commentsSlice.ts";
import CommentItem from "../comments/components/CommentItem.tsx";
import {fetchPostsComments} from "../comments/commentsThunk.ts";

const OnePostInfo = () => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const user = useAppSelector(selectUser);
    const postInfo = useAppSelector(selectOnePostInfo);
    const loading = useAppSelector(selectOnePostFetching);
    const commentsList = useAppSelector(selectPostsComments);
    const commentsFetching = useAppSelector(selectCommentsFetching);

    let postImage;
    let dateAt;

    useEffect(() => {
        if(id && user){
            const postInfoProps = {
                _id: id,
                token: user.token
            }
            dispatch(fetchOnePostInfo(postInfoProps));
            dispatch(fetchPostsComments(postInfoProps));

        }
    }, [dispatch]);


    if(postInfo) {
        postImage = imageNotAvailable;
        if (postInfo.image) {
            postImage = apiURL + '/' + postInfo.image;
        }
        dateAt = dayjs(postInfo.createdAt).locale('ru').format('D MMMM, YYYY HH:mm:ss');
    }
    return (
        <>
        <ModalWindow/>
            <Grid container sx={{maxWidth: "70%", margin: 'auto'}}>
                {!postInfo ? (
                    <h1>Пост возможно был удален</h1>
            ) : loading ? (
                <Loading />
            ) : (
                <Paper sx={{p:2, mb: 2}}>
                    <img src={postImage} alt={postInfo.title} />
                    <Typography variant="h4" sx={{ ml: 2 }}>
                        {postInfo.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ ml: 2 }}>
                        {postInfo.description}
                    </Typography>
                    <Grid container justifyContent='right'>
                        <Typography variant="subtitle2">Автор: <strong>{postInfo.user.username}</strong></Typography>
                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                            {dateAt}
                        </Typography>
                    </Grid>
                    {user ? <Button onClick={() =>dispatch(isShowModal())}>Добавить комментарий</Button>: null}
                </Paper>
            )}
                <Grid width='70%'>
                {commentsFetching && <CircularProgress /> }

                {!commentsList ? null :
                    (
                        commentsList.map(comment => (
                            <CommentItem
                                key={comment._id}
                                message={comment.message}
                                author={comment.user.username}
                            />
                        ))
                    )}
            </Grid>

        </Grid>
        </>

    );
};

export default OnePostInfo;