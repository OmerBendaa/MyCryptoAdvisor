import { IUser, IUserPreferences } from "../common/types";
import userService from "../services/usersService";
import { Request, Response } from "express";
import authService from "../services/authService";

const createUser = async (req: Request<IUser>, res: Response) => {
    try {
    const user = await userService.createUser(req.body);
    console.log("Created user:", user);
    res.status(201).json(user);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
    const email=req.query.email;
    try {
    const user = await userService.getUserByEmail(email as string);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getOmittedUserByEmail = async (req: Request, res: Response) => {
    const email=req.query.email;
    try {
    const user = await userService.getOmittedUserByEmail(email as string);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

const login = async (req: Request<{ email: string; password: string }>, res: Response) => {
    try {
    const userToken = await authService.login(req.body.email,req.body.password);
    res.status(200).json({userToken});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
const updateUserPreferences = async (req: Request<{userId:string, preferences: IUserPreferences}>, res: Response) => {
  try {
    const userId = req.body.userId;
    const preferences = req.body.preferences;
    const updatedUser = await userService.updateUserPreferences(userId, preferences);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  getUserByEmail,
  getOmittedUserByEmail,
  updateUserPreferences,
  login,
};
