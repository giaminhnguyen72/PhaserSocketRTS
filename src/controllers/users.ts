'use strict';

import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import User from './../models/User';
import IUserDocument from '../interfaces/IUserDocument';
import userModel from './../models/User';
import { IUserModel } from '../interfaces/IUser';

export default class Controller {
    model: IUserModel<IUserDocument>
    constructor(modelSchema: IUserModel<IUserDocument>) {
      this.model = modelSchema
    }
    getAll(req: Request, res: Response, next: NextFunction): void {
      userModel
        .fetchAll()
        .then(result => res.status(OK).json(result))
        .catch((error)  => next(error));
    }
    getByID(req: Request, res: Response, next: NextFunction): void {
      const { userID } = req.params;
    
      userModel
        .fetchByID(userID)
        .then((result: IUserDocument) => res.status(OK).json(result))
        .catch((error: any) => next(error));
    }
  /**
   * Updates an User based on its ID, and returns the updated user as a JSON
   *
   * @param {Request} _req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Response}
   */
    modifyByID(req: Request, res: Response, next: NextFunction): void {
      const { userID } = req.params;
      const modifications = req.body;

      userModel
        .modifyByID(userID, modifications)
        .then((result: IUserDocument) => res.status(OK).json(result))
        .catch((error: any) => next(error));
    }
    /**
 * Creates a new User, and returns it as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
  create(req: Request, res: Response, next: NextFunction): void {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    userModel
      .insertOne(newUser)
      .then(result => res.status(OK).json(result))
      .catch((error: any) => next(error));
  }
 
}
/**
 * Fetches all users and return them as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const getAll = (req: Request, res: Response, next: NextFunction): void => {
  userModel
    .fetchAll()
    .then(result => res.status(OK).json(result))
    .catch((error)  => next(error));
};

/**
 * Fetches an User based on its ID, and returns it as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const getByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  userModel
    .fetchByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

/**
 * Updates an User based on its ID, and returns the updated user as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const modifyByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;
  const modifications = req.body;

  userModel
    .modifyByID(userID, modifications)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

/**
 * Creates a new User, and returns it as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const create = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password } = req.body;

  const newUser = {
    name,
    email,
    password,
  };

  userModel
    .insertOne(newUser)
    .then(result => res.status(OK).json(result))
    .catch((error: any) => next(error));
};

/**
 * Deletes a User based on its ID, and returns the deleted user as a JSON
 *
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Response}
 */
export const deleteByID = (req: Request, res: Response, next: NextFunction): void => {
  const { userID } = req.params;

  User
    .deleteByID(userID)
    .then((result: IUserDocument) => res.status(OK).json(result))
    .catch((error: any) => next(error));
};
