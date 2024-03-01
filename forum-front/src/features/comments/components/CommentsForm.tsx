import {Box, Container, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";
import {selectCommentsCreating} from "../commentsSlice.ts";
import {createComment} from "../commentsThunk.ts";


const CommentsForm = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const creating = useAppSelector(selectCommentsCreating);
    const {id} = useParams();
    const [state, setState] = useState({
        message: ''
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };
    const handleSubmit = () => {
        if(id && user){
            const postInfoProps = {
                comment:{
                    post: id,
                    message: state.message,
                },
                token: user.token
            }
            console.log(postInfoProps)
            dispatch(createComment(postInfoProps));
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Add New Comment</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Posts comment"
                        variant="outlined"
                        multiline
                        rows={4}
                        name='message'
                        required
                        value={state.message}
                        onChange={inputChangeHandler}
                    />
                    <LoadingButton
                        type="button"
                        loading={creating}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={state.message === ''}
                    >
                        Создать
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>

    );
};

export default CommentsForm;