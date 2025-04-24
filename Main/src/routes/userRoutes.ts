import express, { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';
import mongoose from 'mongoose';

const router = express.Router();

// GET all users
router.get('/', async (_: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// GET a single user
router.get('/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;  // Ensure early exit
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// POST a new user
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err });
  }
});

// PUT to update a user
router.put('/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;  // Ensure early exit
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err });
  }
});

// DELETE a user
router.delete('/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;  // Ensure early exit
    }
    // Delete associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });
    res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});

// POST to add a friend
router.post('/:userId/friends/:friendId', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;  // Ensure early exit
    }
    // Check if they are already friends
    if (user.friends.includes(friend._id as mongoose.Types.ObjectId)) {
      res.status(400).json({ message: 'Already friends' });
      return;
    }
    // Add the friend
    user.friends.push(friend._id as mongoose.Types.ObjectId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error adding friend", error: err });
  }
});

// DELETE to remove a friend
router.delete('/:userId/friends/:friendId', async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;  // Ensure early exit
    }

    // Use the $pull operator to remove the friend from the user's friends array
    user.friends = user.friends.filter(
        (friend) => friend.toString() !== req.params.friendId
    )
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error removing friend", error: err });
  }
});

export default router;
