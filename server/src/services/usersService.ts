import { IUser } from "../common/types";
import User from "../models/UserScheme";
import encryptionUtils from "../utils/encryptionUtils";

const omitPassword = (user: IUser): Omit<IUser, "password"> => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

const createUser = async (user: IUser): Promise<Omit<IUser, "password">> => {
  user.password = encryptionUtils.encrypt(user.password);
  try {
    const newUser = await User.create(user);
    return omitPassword(newUser);
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
const getOmittedUserByEmail = async (email: string):  Promise<Omit<IUser, "password">>=> {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    return omitPassword(user);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default {
  createUser,
  getUserByEmail,
  getOmittedUserByEmail,
};
