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
  export type CoinDataType={
    id: string;
    image: {thumb: string, small:string, large:string};
    market_data: {current_price: {[key:string]:number} };
}

