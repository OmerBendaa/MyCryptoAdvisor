import axios from "axios";
import { IUser } from "../common/types";
import { API_USER_BASE } from "../common/constants";
const fetchUser = async (): Promise<IUser | null> => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    console.warn("No token found in localStorage");
    return null;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const email = decodedToken.email;

    const response = await axios.get(`${API_USER_BASE}email?email=${email}`);
    return response.data?._doc || null;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
};
export default fetchUser;
