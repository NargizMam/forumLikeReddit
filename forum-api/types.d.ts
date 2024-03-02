import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}
export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}
type UserModel = Model<UserFields, {}, UserMethods>;
export interface IPost {
  user: Object.id;
  title: string;
  image?: string;
  description?: string;
}
export interface PostMutation {
  user: string,
  title: string,
  description?: string | null,
  image?: string | null,
}
export interface CommentMutation {
  user: string,
  post: string,
  message: string
}
  export interface PostApi {
    _id: string;
    user: {
      id: string,
      username: string
    };
    title: string;
    image: string | null;
    createdAt: string;
    commentsCount: number;
  }
