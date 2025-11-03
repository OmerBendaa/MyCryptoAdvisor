import { IUser } from "../common/types";
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


// const getUserByToken = async (req: Request, res: Response) => {
//   try{
//     const token = req.body.token;
//     const {_id}=jwt.decode(token) as {_id:string};
//     const user = await userService.getUserById(_id);
//     if(!user){
//       res.status(404).json({message:"user not found"});
//     }else{
//       res.status(200).json(user);
//     }
//   }catch(error:any){
//     res.status(500).json({ message: error.message });
//   }
// }

const login = async (req: Request<{ email: string; password: string }>, res: Response) => {
    try {
    const user = await authService.login(req.body.email,req.body.password);
    res.status(200).json({user});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createUser,
  getUserByEmail,
  login,
};
