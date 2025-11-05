export interface IUser{
  name: string;
  email: string;
  password: string;
  userPreferences?: IUserPreferences;
}
export interface IUserPreferences {
    cryptoAssets:string[],
    investorTypes:string[],
    contentTypes:string[]
}
