import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  imageUrl: string;
  category: string;
  tickets: {
    available: number;
    total: number;
  };
  organizer: {
    name: string;
    contact: string;
  };
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  tickets: {
    available: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  organizer: {
    name: { type: String, required: true },
    contact: { type: String, required: true },
  },
});

export default mongoose.model<IEvent>("Event", EventSchema);
