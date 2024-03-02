import React from 'react';
import {Box, Card, CardContent, Typography,} from '@mui/material';
import dayjs from "dayjs";

interface Props {
    message: string;
    author: string;
    createdAt: string;
}

const CommentItem: React.FC<Props> = ({author, message, createdAt}) => {
    const dateAt = dayjs(createdAt).locale('ru').format('D MMMM, YYYY HH:mm:ss');

    return (
        <Card
            sx={{
                '& + &': {
                    mt: 3,
                },
                borderRadius: '10px',
            }}
            elevation={4}

        >
            <CardContent>
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
                >{message}</Typography>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Typography variant="subtitle2">{`By ${author}`}</Typography>
                </Box>
                <Typography variant="subtitle2">{dateAt}</Typography>

            </CardContent>
        </Card>
    );
};

export default CommentItem;