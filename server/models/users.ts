import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    createdAt: { type: Date, default: Date.now },
    walletId: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
