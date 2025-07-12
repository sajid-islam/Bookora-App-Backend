import express from "express";
import "dotenv/config";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
const port = 3000 || process.env.PORT;
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT", port);
    connectDB();
});
