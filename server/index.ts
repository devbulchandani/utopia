import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import eventRoutes from "./routes/events";
import { v2 as cloudinary } from "cloudinary";



dotenv.config();



const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

cloudinary.config({
  cloud_name:'dlevbirqh',
  api_key:'749639798546451',
  api_secret:'AGuwIpLSJ_a-DbikKDDC7T3SDwc',
}) 


connectDB();
app.get("/", (req, res) => {
  res.send("Hello, TypeScript!");
});
app.use("/api/events", eventRoutes);
app.use("/auth", authRoutes);


// Routes


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
