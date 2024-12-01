import express from "express";
import Event from "../models/event";
import multer from "multer";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({ storage: storage })

// Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// Get event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ error: "Failed to fetch event details" });
    }
});

// Create a new event
router.post("/", upload.single("image"), async (req, res) => {
    console.log("Storage: ", upload);
    try {
        const { body, file } = req;
        console.log("Request Body: ", JSON.stringify(body));

        if (!file || !file.buffer) {
            return res.status(400).json({ error: "No image file provided" });
        }

        // Parse numbers and dates properly
        const price = parseFloat(body.price);
        const totalTickets = parseInt(body.totalTickets, 10);
        const availableTickets = totalTickets; 
        const date = new Date(body.date);

        if (isNaN(price) || isNaN(totalTickets) || isNaN(date.getTime())) {
            return res.status(400).json({ error: "Invalid numeric or date value" });
        }

        const base64Image = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64Image}`;
        const result = await cloudinary.uploader.upload(dataUri, {
            resource_type: "auto",
            folder: 'posters'
        });

        const newEvent = new Event({
            title: body.title,
            description: body.description,
            date,
            location: body.location,
            price,
            imageUrl: result.url, // Cloudinary URL
            category: body.category,
            tickets: {
                available: availableTickets,
                total: totalTickets,
            },
            organizer: {
                name: body.organizerName,
                contact: body.organizerContact,
            },
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
});


// Update an event by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ error: "Failed to update event" });
    }
});

// Delete an event by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Failed to delete event" });
    }
});

// Purchase tickets
router.post("/tickets/purchase", async (req, res) => {
    const { eventId, quantity } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.tickets.available < quantity) {
            return res.status(400).json({ error: "Not enough tickets available" });
        }

        event.tickets.available -= quantity;
        await event.save();

        res.status(200).json({
            message: "Tickets purchased successfully",
            ticketsRemaining: event.tickets.available,
        });
    } catch (error) {
        console.error("Error purchasing tickets:", error);
        res.status(500).json({ error: "Failed to purchase tickets" });
    }
});

export default router;
