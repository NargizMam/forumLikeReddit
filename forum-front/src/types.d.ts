export interface RegisterMutation {
  username: string;
  password: string;
}
export interface LoginMutation {
  username: string;
  password: string;
}
export interface User {
  _id: string;
  username: string;
  token: string;
}
export interface ValidationError {
  errors: {
    [key: string]:{
      name: string;
      message: string
    }
  },
  message: string;
  name: string;
  _message: string;
}
export interface RegisterResponse {
  message: string,
  user: User
}
export interface GlobalError {
  error: string
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
}
export interface PostMutation {
  title: string;
  image: string | null;
  description: string | null;
}
export interface PostsProps {
  post: PostMutation;
  token: string;
}
export interface OnePostProps {
  _id: string;
  token: string;
}
export interface OnePostApi {
  _id: string;
  user: {
    id: string,
    username: string
  };
  description?: string;
  title: string;
  image?: string | null;
  createdAt: string;
}
export interface CommentMutation {
  post: string;
  message: string;
}
export interface CommentProps {
  token: string;
  comment: CommentMutation;
}

export interface CommentsApi {
  _id: string,
  user: {
    username: string
  },
  message: string,
  post: string
}