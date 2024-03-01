import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import {IPost} from "../types";
import Post from "./Post";

const CommentsSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            ref: 'User',
            validate: {
                validator: async (value: Types.ObjectId) => {
                    const user = await User.findById(value, 'username');
                    return Boolean(user);
                },
                message: 'Пользователь не найден!',
            },
        },
        post: {
            type: String,
            required: true,
            ref: 'Post',
            validate: {
                validator: async (value: Types.ObjectId) => {
                    const post = await Post.findById(value);
                    return Boolean(post);
                },
                message: 'Пост не найден!',
            }
        },
        message: {
            type: String,
            required: true
        },

    }, {timestamps: true});

const Comment = mongoose.model('Comment', CommentsSchema );

export default Comment;
