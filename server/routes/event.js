// routes/event.js

import express from "express";
import { z } from "zod";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import Event from "../models/event.js";
import Ticket from "../models/Ticket.js";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new Cloudinary storage instance
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage });

const router = express.Router();

// Validation schemas
const EventSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  date: z.string(),
  location: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  totalTickets: z.number().int().positive(),
  organizerName: z.string().min(1),
  organizerContact: z.string().min(1),
});

const TicketPurchaseSchema = z.object({
  eventId: z.string(),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(1),
  quantity: z.number().int().positive(),
});

// Event routes
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      price: parseFloat(req.body.price),
      imageUrl: req.file.path,
    };
    const validatedData = EventSchema.parse(eventData);

    const event = new Event(validatedData);
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const eventData = { ...req.body, price: parseFloat(req.body.price) };
    const validatedData = EventSchema.parse(eventData);

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (req.file) {
      validatedData.imageUrl = req.file.path;
    } else {
      validatedData.imageUrl = event.imageUrl;
    }

    await Event.findByIdAndUpdate(req.params.id, validatedData, { new: true });

    const updatedEvent = await Event.findById(req.params.id);
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ticket purchase route
router.post("/tickets/purchase", async (req, res) => {
  try {
    const validatedData = TicketPurchaseSchema.parse(req.body);

    // Check event exists and has enough tickets
    const event = await Event.findById(validatedData.eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.availableTickets < validatedData.quantity) {
      throw new Error("Not enough tickets available");
    }

    // Calculate total price
    const totalPrice = event.price * validatedData.quantity;

    // Create ticket purchase record
    const ticket = new Ticket({
      eventId: validatedData.eventId,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      quantity: validatedData.quantity,
      totalPrice,
    });

    await ticket.save();

    // Update available tickets
    event.availableTickets -= validatedData.quantity;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
