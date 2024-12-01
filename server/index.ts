import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";




dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


connectDB();
app.get("/", (req, res) => {
  res.send("Hello, TypeScript!");
});

app.use("/auth", authRoutes);

// Routes


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
