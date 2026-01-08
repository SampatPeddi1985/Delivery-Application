import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// 👇 MOUNT ROUTES HERE
app.use("/restaurants", restaurantRoutes);

app.listen(8000, "0.0.0.0", () => {
  console.log("Backend running on port 8000");
});

