import express from 'express';
import User from '../models/users';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { clerkId, email, firstName, lastName, walletId } = req.body;
    try {
        let user = await User.findOne({ clerkId });
        if (!user) {
            user = new User({ clerkId, email, firstName, walletId, lastName });
            await user.save();
        }
        res.status(200).json({ message: 'User registered', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

export default router;
