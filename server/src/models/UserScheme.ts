import mongoose from "mongoose";
import { IUser,IUserPreferences } from "../common/types";

const UserScheme = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 300,
  },
    userPreferences:{
        type:Object,
        required:false,
        default:null
    }
});
const User = mongoose.model<IUser>("users", UserScheme);
export default User