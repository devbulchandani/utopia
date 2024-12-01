// models/Event.js

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  price: Number,
  imageUrl: String,
  category: String,
  totalTickets: Number,
  availableTickets: Number,
  organizerName: String,
  organizerContact: String,
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
