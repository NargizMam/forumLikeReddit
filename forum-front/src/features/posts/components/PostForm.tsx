
const PostForm = () => {
    return (
        <div>

        </div>
    );
};

export default PostForm;

import React, { useState } from 'react';
import {TextField, Button, Typography, Box, Container, Paper, Grid} from '@mui/material';

const AddPostForm: React.FC = () => {
    const [postTitle, setPostTitle] = useState<string>('');
    const [postDescription, setPostDescription] = useState<string>('');
    const [postImage, setPostImage] = useState<File | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostDescription(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setPostImage(event.target.files[0]);
        }
    };

    const isFormValid = () => {
        return postImage !== null || postDescription.trim() !== '';
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            // Здесь можно добавить логику отправки данных на сервер
            console.log('Submitted:', {
                title: postTitle,
                description: postDescription,
                image: postImage,
            });
        } else {
            console.log('Form is not valid');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">Add a New Post</Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Post Title"
                        variant="outlined"
                        value={postTitle}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Post Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={postDescription}
                        onChange={handleDescriptionChange}
                    />
                    <Grid item xs>
                        <FileInput
                            label="Image"
                            name="image"
                            onChange={fileInputChangeHandler}
                        />
                    </Grid>
                    <Typography sx={{ mt: 1 }}>{postImage ? postImage.name : 'No image selected'}</Typography>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddPostForm;
