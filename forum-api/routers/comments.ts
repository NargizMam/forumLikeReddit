import {Router} from 'express';
import auth, {RequestWithUser} from '../middleware/auth';
import mongoose from 'mongoose';
import {CommentMutation} from '../types';
import Comment from '../models/Comment';

const commentsRouter = Router();

commentsRouter.get('/', auth, async (req, res, next) => {
    try {
        if (req.query.post) {
            const postsComments = await Comment.find({'post': req.query.post}).populate('user', 'username');
            res.send(postsComments);
        }
        return res.send('Нет комментариев')
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
});
commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
    const user = req.user?.id;
    try {
        if (Boolean(req.body.message.trim())) {
            const commentData: CommentMutation = {
                post: req.body.post,
                user: user,
                message: req.body.message,
            };
            const newComment = new Comment(commentData);
            await newComment.save();

            res.send(newComment);
        } else {
            return res.status(422).send({message: 'error'});
        }
} catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
    }

    next(e);
}});

export default commentsRouter;