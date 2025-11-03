import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.ts";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
console.log("mongoUri---->",process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI||"")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/users", userRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
