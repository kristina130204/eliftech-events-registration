import { db } from "./db.js";
import EventModel from "./models/Event.js";
import axios from "axios";
import schedule from "node-schedule";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const quantity = 10;

const rule = "*/1 * * * *"; // seeding 10 events for 1 minute

const fetchEvents = async () => {
  try {
    const response = await axios.get(
      `https://fakerapi.it/api/v1/custom?_quantity=${quantity}&title=word&description=word&eventDate=date&organaizer=name`
    );
    const data = response.data.data;
    data.map((d) => {
      d.participants = [];
      const date = new Date(d.eventDate);
      date.setFullYear(2025);
      d.eventDate = date;
      return new EventModel(d);
    });
    return data || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

db();

const saveEvents = async (events) => {
  await EventModel.insertMany(events);
};

const job = schedule.scheduleJob(rule, async () => {
  const events = await fetchEvents();
  saveEvents(events);
});

app.listen(process.env.SEEDING_PORT, () => {
  console.log("Seeding server running");
});
