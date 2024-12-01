// models/Ticket.js

import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  quantity: Number,
  totalPrice: Number,
  purchaseDate: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
