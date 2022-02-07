import { Model } from "mongoose";
import IUserDocument from "./IUserDocument";
/* user document extended */
export interface IUser extends IUserDocument {}
export interface IUserModel<T> extends Model<IUser> {
    fetchAll(): Promise<T>;
    fetchByID(userID: string): Promise<T>;
    insertOne(newUser: any): Promise<T>;
    deleteByID(userID: string): Promise<T>;
    modifyByID(userID: string, modifications: {}): Promise<T>;
  }