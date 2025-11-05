export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userPreferences?: IUserPreferences;
}
export interface IUserPreferences {
  cryptoAssets: string[];
  investorTypes: string[];
  contentTypes: string[];
}
export type Asset = "Bitcoin" | "Ethereum" | "Solana" | "Dogecoin";
export type InvestorType =
  | "HODLer"
  | "Day Trader"
  | "NFT Collector"
  | "Yield Farmer"
  | "DeFi Enthusiast";
export type ContentPreference =
  | "Market News"
  | "Charts"
  | "Social"
  | "Fun"
  | "Education";
