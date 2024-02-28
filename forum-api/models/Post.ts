import mongoose, { Schema, Types } from 'mongoose';
import User from './User';
import {IPost} from "../types";

const PostsSchema = new Schema<IPost>(
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
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: function (){
                return !this.image;
            }
        },
        image: {
            type: String,
            required: function (){
                return !this.description;
            }
        }
    }, {timestamps: true});

const Post = mongoose.model('Post', PostsSchema );

export default Post;
