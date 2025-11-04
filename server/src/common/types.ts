export interface IUser{
  name: string;
  email: string;
  password: string;
  userPreferences?: IUserPreferences;
}
export interface IUserPreferences {
    cryptoAssets:string[],
    investorType:string[],
    contentType:string[]
}