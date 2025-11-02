import encryptionUtils from "../utils/encryptionUtils";
import jwtUtils from "../utils/jwtUtils";
import usersService from "./usersService";

const login = async (email:string,password:string) => {
    const user = await usersService.getUserByEmail(email);
    if(!user){
        throw new Error("invalid email or password");
    }
    if(!encryptionUtils.compare(password,user.password)){
        throw new Error("invalid email or password");
    }
    return jwtUtils.sign({ email:user.email});
}

export default {
    login
}