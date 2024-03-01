import {Box, Container, Paper, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";

interface Props {
    postId: string;
}
const CommentsForm = () => {
    const dispatch = useAppDispatch();
    const navigate= useNavigate();
    const user = useAppSelector(selectUser);
    const [state, setState] = useState({
        message: ''
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

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
                        // loading={creating}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        // onClick={handleSubmit}
                        disabled={)}
                    >
                        Создать
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>

    );
};

export default CommentsForm;