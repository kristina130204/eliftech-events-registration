import EventModel from "../models/Event.js";

export const getEvents = async (req, res) => {
  let eventsPerPage = 12;
  const page = req.query.page;
  const property = req.query.sort;
  const order = req.query.order == "asc" ? 1 : -1;
  const sortDetails = { [property]: order };
  try {
    const events = await EventModel.find()
      .skip(page * eventsPerPage)
      .limit(eventsPerPage)
      .sort(sortDetails);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const registerForEvent = async (req, res) => {
  const user = req.body;
  const id = req.params.id;
  let isUserRegistered = false;
  try {
    const event = await EventModel.findById(id);
    event.participants.forEach((p) => {
      if (p.email === user.email) {
        isUserRegistered = true;
      }
    });
    if (isUserRegistered) {
      res.status(403).json("You are already registered for this event.");
    } else {
      let date = Date.now();
      user.registeredAt = new Date(date);
      await event.updateOne({ $push: { participants: user } });
      res.status(200).json("Registered successfully.");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getParticipants = async (req, res) => {
  const id = req.params.id;
  try {
    const event = await EventModel.findById(id);
    const participants = event.participants;
    const title = event.title;
    res.status(200).json({ participants, title });
  } catch (error) {
    res.status(500).json(error);
  }
};
