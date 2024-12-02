import express from "express";
import Event from "../models/event";
import multer from "multer";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import mongoose from "mongoose";
import User from "../models/users";

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
    const eventId = req.params.id;

    // Check if the eventId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
        const event = await Event.findById(eventId);

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
    try {
        const { body, file } = req;

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
        console.log('hi');
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
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Failed to delete event', error });
    }
});


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true } // Return the updated document
        );
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event cancelled successfully', event });
    } catch (error) {
        console.error('Error cancelling event:', error);
        res.status(500).json({ message: 'Failed to cancel event', error });
    }
})

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

router.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({
            clerkId: userId
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userEmail = user.email;
        const events = await Event.find({ "organizer.contact": userEmail });

        if (!events.length) {
            return res.status(404).json({ error: "No events found for this user" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events for user by email:", error);
        res.status(500).json({ error: "Failed to fetch events for user" });
    }
});

router.get("/user/:userId/hasEvents", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const userEmail = user.email;
        const events = await Event.find({ "organizer.contact": userEmail });

        res.status(200).json({ hasEvents: events.length > 0 });
    } catch (error) {
        console.error("Error fetching events for user by email:", error);
        res.status(500).json({ error: "Failed to fetch events for user" });
    }
});

router.patch('/:id/register', async (req, res) => {
    const eventId = req.params.id;
    const { registered } = req.body;

    if (!registered || registered.length === 0) {
        return res.status(400).json({ message: "No registration details provided" });
    }

    const { name, email, phone, quantity } = registered[0]; // Extract the first object from the array
    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.registered.push({
            name,
            email,
            phone,
            quantity,
        });

        event.tickets.available -= quantity;

        if (event.tickets.available < 0) {
            return res.status(400).json({ message: "Not enough available tickets" });
        }

        await event.save();

        return res.status(200).json(event);
    } catch (error) {
        console.error("Error registering for event:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.get("/user/:userId/events", async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const userEmail = user.email;
        console.log(userEmail);
        const events = await Event.find({
            "registered.email": userEmail,
        });


        if (events.length === 0) {
            return res.status(404).json({ error: "No events found for this user" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events for user:", error);
        res.status(500).json({ error: "Failed to fetch events for user" });
    }
});




export default router;
