import axios from 'axios';
import env from "react-dotenv"
const hf = axios.create({
  baseURL: 'https://router.huggingface.co/v1/chat/completions',
  headers: {
    Authorization: `Bearer ${env.HUGGINGFACE_API_TOKEN}`,
    "Access-Control-Allow-Origin": "*"
  },
});
const generateCryptoInsightOfTheDay=async (preferences: string[])=> {
  const res = await hf.post("",{
        "messages": [
            {
                "role": "user",
                "content": `generate a crypto themed insight of the day about one of the given preferences: ${preferences.join(", ")}, use a maximum of one sentence, return only the chosen sentence`
            }
        ],
        "model": "meta-llama/Llama-3.1-8B-Instruct:cerebras",
        "stream": false
    }
);
  return(res.data.choices[0].message.content);
}

export default {generateCryptoInsightOfTheDay};