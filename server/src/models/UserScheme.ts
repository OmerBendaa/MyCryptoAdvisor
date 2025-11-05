  import mongoose from "mongoose";
  import { IUser, IUserPreferences } from "../common/types";
  const ASSET_ENUM = ["Bitcoin", "Ethereum", "Solana", "Dogecoin"];
  const INVESTOR_ENUM = ["HODLer", "Day Trader", "NFT Collector", "Yield Farmer", "DeFi Enthusiast"];
  const CONTENT_ENUM = ["Market News", "Charts", "Social", "Fun", "Education"];
  const UserPreferencesSchema = new mongoose.Schema<IUserPreferences>(
    {
      cryptoAssets: {
        type: [String],
        enum: ASSET_ENUM, 
        default: [],
      },
      investorTypes: {
        type: [String],
        enum: INVESTOR_ENUM, 
        default: [],
      },
      contentTypes: {
        type: [String],
        enum: CONTENT_ENUM,
        default: [],
      },
    },
    { _id: false }
  );

  const UserSchema = new mongoose.Schema<IUser>({
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
    userPreferences: {
      type: UserPreferencesSchema,
      required: false,
      default: null, 
    },
  });

  const User = mongoose.model<IUser>("users", UserSchema);
  export default User;
