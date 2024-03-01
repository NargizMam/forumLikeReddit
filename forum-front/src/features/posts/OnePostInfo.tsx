import {Button, Grid, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOnePostFetching, selectOnePostInfo} from "./postSlice.ts";
import {useEffect, useState} from "react";
import {fetchOnePostInfo} from "./postThunk.ts";
import {useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice.ts";
import {OnePostProps} from "../../types";
import Loading from "../../components/UI/Spinner/Loading.tsx";
import dayjs from "dayjs";
import imageNotAvailable from "../../assets/images/noImage.png";
import {apiURL} from "../../constants.ts";
import ModalWindow from "../../components/UI/Modal/ModalWindow.tsx";

const OnePostInfo = () => {
    const dispatch = useAppDispatch();
    const postInfo = useAppSelector(selectOnePostInfo);
    const {id} = useParams();
    const user = useAppSelector(selectUser);
    const loading = useAppSelector(selectOnePostFetching);
    const [showModal, setShowModal] = useState(false);


    let postInfoProps: OnePostProps;
    let postImage;
    let dateAt;

    useEffect(() => {
        if(id && user){
            postInfoProps = {
                _id: id,
                token: user.token
            }
        }
        dispatch(fetchOnePostInfo(postInfoProps));
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
        <ModalWindow open={showModal}/>
        <Grid container>
            {!postInfo ? (
                <h1>Пост возможно был удален</h1>
            ) : loading ? (
                <Loading />
            ) : (
                <Paper elevation={3} sx={{p:2}}>
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
                    {user ? <Button onClick={() =>setShowModal(true)}>Добавить комментарий</Button>: null}
                </Paper>
            )}
        </Grid>
        </>

    );
};

export default OnePostInfo;