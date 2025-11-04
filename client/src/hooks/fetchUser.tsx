import axios from "axios";
import {IUser} from "../common/types";
const fetchUser = async (email: string) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const user: IUser = await axios.get(
      "http://localhost:5000/users/email?email=" + decodedToken.email
    );
    return user;
  }
};

export default fetchUser;