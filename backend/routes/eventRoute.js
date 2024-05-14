import express from "express";
import {
  getEvents,
  getParticipants,
  registerForEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.put("/:id", registerForEvent);
router.get("/:id", getParticipants);

export default router;
