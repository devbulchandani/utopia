const { default: User } = require("./users");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  price: Number,
  imageUrl: String,
  category: String,
  tickets: {
    available: Number,
    total: Number,
  },
  organizer: {
    name: String,
    contact: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'cancelled', 'completed'],
    default: 'upcoming',
  },
  registered: [
    {
      User,
      registrationDate: Date,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
