import React, {useEffect, useState} from 'react';
import {TextField, Typography, Box, Container, Paper, Grid} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {useNavigate} from "react-router-dom";
import {PostMutation} from "../../../types";
import FileInput from "../../../components/UI/FileInput/FileInput.tsx";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {createPost} from "../postThunk.ts";
import {selectPostsCreating} from "../postSlice.ts";

const PostForm: React.FC = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const creating = useAppSelector(selectPostsCreating);
    const [state, setState] = useState<PostMutation>({
        title: '',
        description: '',
        image: null,
    });
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    const isFormValid = () => {
        return state.image !== null || state.description !== '';
    };

    const handleSubmit = async () => {
        if (isFormValid() && user) {

            const infoForAdd = {
                post: state,
                token: user.token
            }
            await dispatch(createPost(infoForAdd)).unwrap();
            navigate('/');
        } else {
            console.log('Form is not valid');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant="h5">Add New Post</Typography>
                <Box component="form" noValidate sx={{mt: 3}}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Post Title"
                        variant="outlined"
                        value={state.title}
                        name='title'
                        onChange={inputChangeHandler}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Post Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        name='description'
                        required={!state.image}
                        value={state.description}
                        onChange={inputChangeHandler}
                    />
                    <Grid item xs>
                        <FileInput
                            label="Image"
                            name="image"
                            require={state.description === ''}
                            onChange={fileInputChangeHandler}
                        />
                    </Grid>
                    <LoadingButton
                        type="button"
                        loading={creating}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3}}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
};

export default PostForm;
