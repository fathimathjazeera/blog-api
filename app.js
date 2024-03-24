import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js";
configDotenv();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`running on "${process.env.PORT}"`);
});
mongoose.connect(process.env.MONGO_URI);

app.use("/api/user", UserRoutes);
console.log("object");
console.log("Gopika");
console.log("first")