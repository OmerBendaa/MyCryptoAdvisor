import axios from "axios";
import env from "react-dotenv"
const BASE_CRYPTO_PANIC_BASE_URL="https://cryptopanic.com/api/developer/v2";

const cryptoPanicClient = axios.create({
    baseURL: BASE_CRYPTO_PANIC_BASE_URL, 
 })

 const getMarketNews=async ()=>{
    try{
         return axios.get(`${BASE_CRYPTO_PANIC_BASE_URL}/posts/?auth_token=${env.CRYPTO_PANIC_API_TOKEN}`)
    }catch(error){
        console.error("Error Market News:", error);
        throw error;
    }
 }


export default {getMarketNews}