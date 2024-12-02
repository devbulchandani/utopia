import mongoose, { Schema, Document } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    tickets: {
        total: {
            type: Number,
            required: [true, 'Total tickets are required'],
            min: [1, 'Total tickets must be greater than 0']
        },
        available: {
            type: Number,
            required: [true, 'Available tickets are required'],
            min: [0, 'Available tickets cannot be negative']
        },
    },
    imageUrl: { type: String, required: true },
    registered: [
        {
            name: String,
            email: String,
            phone: String,
            quantity: Number,
        },
    ],
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event
