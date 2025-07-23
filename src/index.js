import express from "express";
import "dotenv/config";
import cors from "cors";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
const port = 3001 || process.env.PORT;
app.use(express.json());
app.use(cors());
job.start();

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => {
    res.send("HELLO FROM BOOKORA SERVER");
});

app.listen(port, () => {
    console.log("SERVER RUNNING ON PORT", port);
    connectDB();
});
