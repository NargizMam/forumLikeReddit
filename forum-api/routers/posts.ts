import {Router} from "express";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import mongoose, {Types} from "mongoose";
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
postsRouter.get('/:id', auth, async (req: RequestWithUser, res, next) => {
    try{
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }
        const post = await Post.findById(_id).populate('user', 'username');
        console.log(post)
        if(!post){
            return res.status(404).send({error: 'Not found!'});
        }
        res.send(post);
    } catch (e) {
        return next(e);
    }
});
postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser,res, next) => {
    const user = req.user?.id;
    try {
        const postData: PostMutation = {
            title: req.body.title,
            user: user._id,
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