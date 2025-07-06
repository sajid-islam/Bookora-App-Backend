import express from "express";
import "dotenv/config";

const app = express();
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log("SERVER RUNNING ON PORT", port));
