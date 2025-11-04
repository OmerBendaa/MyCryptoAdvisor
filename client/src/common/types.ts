export interface IUser{
  name: string;
  email: string;
  password: string;
  userPreferences?: IUserPreferences;
}
export interface IUserPreferences {
    cryptoAssets:string[],
    inverstorType:"HODLer"| "Day Trader" |"NFT Collector",
    contentType:"Market News"|"Charts"| "Social"| "Fun"
}