import { IUser } from "../common/types";
import User from "../models/UserScheme";

const createUser = async (user: IUser): Promise<Omit<IUser, "password">> => {
      console.log("Entered Serviceeeeeeeeeeeeeee");

    try {
    const newUser = await User.create(user);
    const { password, ...userWithoutPassword } = newUser;
    return newUser;
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
  getUserByEmail
};
