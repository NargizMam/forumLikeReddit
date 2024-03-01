import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import mongoose from 'mongoose';
import { CommentMutation } from '../types';
import Comment from '../models/Comment';

const commentsRouter = Router();


commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
    const user = req.user?.id;
    try{
        const commentData: CommentMutation = {
            post: req.body.post,
            user: user,
            message: req.body.message,
        };
        const newComment = new Comment(commentData);
        await newComment.save();

        res.send(newComment);
    }catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
});
export default commentsRouter;