import { Request, Response, NextFunction } from "express";
import * as exampleService from "../../core/services/example.service";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";

const userRepository = new UserRepositoryImpl();
const userService = new exampleService.UserService(userRepository);

export const getStatus = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const status = exampleService.getSystemStatus();
    res.json(status);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
