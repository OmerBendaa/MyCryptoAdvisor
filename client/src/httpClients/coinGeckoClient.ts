import axios from "axios";
import { Asset } from "../common/types";
import { CoinDataType } from "../common/types";
import env from "react-dotenv";
const BASE_COIN_GECKO_DEMO_URL="https://api.coingecko.com/api/v3";
const API_KEY_HEADER="x-cg-demo-api-key"

const coinGeckoClient = axios.create({
    baseURL: BASE_COIN_GECKO_DEMO_URL, 
    headers: { [API_KEY_HEADER]: env.COIN_GECKO_API_KEY }
 })
const fetchCoinById=async(coinId:Asset):Promise<CoinDataType>=>{
    const lowerCaseCoinId=coinId.toLowerCase();
    try {
        
        const response=await coinGeckoClient.get(`/coins/${lowerCaseCoinId}`);
       const{id, image, market_data}=response.data;
       return { id, image, market_data };
    } catch (error) {
        console.error("Error fetching coin by ID:", error);
        throw error;
    }
}
const fetchCoins= async(coins:Asset[]):Promise<CoinDataType[]>=>{
    try {
        const responses = await Promise.all(coins.map(coin => fetchCoinById(coin)));
        return responses;
    } catch (error) {
        console.error("Error fetching coins:", error);
        throw error;
    }
}




export default {
    fetchCoins,
}
