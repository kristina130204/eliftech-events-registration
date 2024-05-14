import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organaizer: {
      type: String,
      required: true,
    },
    participants: {
      type: Array,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Events", EventSchema);

export default EventModel;
