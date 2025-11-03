import { IUser } from "../common/types";
import User from "../models/UserScheme";
import encryptionUtils from "../utils/encryptionUtils";

const createUser = async (user: IUser): Promise<Omit<IUser, "password">> => {
  user.password = encryptionUtils.encrypt(user.password);
  try {
    const newUser = await User.create(user);
    const {id,name,email} = newUser; 
    const userWithoutPassword = {id, name, email};
    return userWithoutPassword;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  createUser,
  getUserByEmail,
};
