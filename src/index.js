import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./lib/db.js";

const app = express();
const port = 3000 || process.env.PORT;

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT", port);
    connectDB();
});
