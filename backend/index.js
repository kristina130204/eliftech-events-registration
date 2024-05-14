import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";
import eventRoute from "./routes/eventRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

db();

app.use("/api/events", eventRoute);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server running");
});
