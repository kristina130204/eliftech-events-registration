import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_PATH = process.env.DB_PATH;

export const db = () =>
  mongoose
    .connect(DB_PATH)
    .catch((err) => console.log(err))
    .then(() => console.log("DB CONNECTED"));
