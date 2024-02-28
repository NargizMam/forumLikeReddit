import React from 'react';
import {Box, Card, CardContent, CardMedia, Typography,} from '@mui/material';
import dayjs from "dayjs";
import imageNotAvailable from '../../../assets/images/noImage.png';
import {apiURL} from "../../../constants.ts";

interface Props {
    id: string;
    title: string;
    author: string;
    image: string | null;
    createdAt: string;
    // commentCount: number;

}

const PostCard: React.FC<Props> = ({ title, image, createdAt, author}) => {
    const dateAt = dayjs(createdAt).locale('ru').format('D MMMM, YYYY HH:mm:ss');
    let postImage = imageNotAvailable;

    if (image) {
        postImage = apiURL + '/' + image;
    }
    return (
        <Card
            sx={{
                '& + &': {
                    mt: 3,
                },
                borderRadius: '20px',
                display: 'flex',
            }}
            elevation={4}

        >
            <CardMedia component="img" sx={{ width: '20%' }} image={postImage} alt="Post Image" />
            <CardContent >
                <Typography
                    color="textSecondary"
                    sx={{
                        mt: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}
                    variant="h5"
                    >{title}</Typography>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexWrap: 'wrap',
                        mt: 2,
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                    <Typography variant="subtitle2">{`By ${author}`}</Typography>
                        <Typography variant="subtitle2" sx={{ ml: 2 }}>
                            {dateAt}
                        </Typography>
                    </Box>
                </Box>
                <Typography
                    align="right"
                    color="textSecondary"
                    sx={{ flexGrow: 1 }}
                    variant="body2"
                >
                    {` comments`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PostCard;