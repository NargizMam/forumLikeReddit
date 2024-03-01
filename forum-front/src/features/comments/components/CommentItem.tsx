import React from 'react';
import {Box, Card, CardContent, Typography,} from '@mui/material';

interface Props {
    message: string;
    author: string;
}

const CommentItem: React.FC<Props> = ({author, message}) => {
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
            </CardContent>
        </Card>
    );
};

export default CommentItem;