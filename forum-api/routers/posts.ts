import {Router} from "express";
import Post from "../models/Post";

const postsRouter = Router();
postsRouter.get('/', async (req, res, next) => {
    try{
        const postsList = await Post.find().select('-description').populate('user', 'username');
        res.send(postsList)
    } catch (e) {
        return next(e);
    }
});
export default postsRouter;