import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
console.log("mongoUri---->",process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI||"")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("MyCryptoAdvisor is running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
