import {Router} from "express";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {PostMutation} from "../types";

const postsRouter = Router();
postsRouter.get('/', async (req, res, next) => {
    try{
        const postsList = await Post.find().select('-description').populate('user', 'username');
        res.send(postsList)
    } catch (e) {
        return next(e);
    }
});
postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser,res, next) => {
    const user = req.user?.id;
    try {
        const postData: PostMutation = {
            title: req.body.title,
            user: req.body.user,
            description: req.body.description,
            image: req.file ? req.file.filename : null,
        };
        const newPost = new Post(postData);
        await newPost.save();

        res.send(newPost);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(422).send(e);
        }

        next(e);
    }
})
export default postsRouter;