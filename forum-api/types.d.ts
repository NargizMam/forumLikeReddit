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
type UserModal = Model<UserFields, {}, UserMethods>;