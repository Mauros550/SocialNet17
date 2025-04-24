import User from '../models/User.js';
import Thought from '../models/Thought.js';
import mongoose from 'mongoose';

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();

    // Create sample users
    const user1 = await User.create({
      username: 'john_doe',
      email: 'john@example.com',
    });

    const user2 = await User.create({
      username: 'jane_doe',
      email: 'jane@example.com',
    });

    // Create sample thoughts
    const thought1 = await Thought.create({
      text: 'This is a thought from John.',
      userId: user1._id,
    });

    const thought2 = await Thought.create({
      text: 'This is a thought from Jane.',
      userId: user2._id,
    });

    // Link thoughts to users
    user1.thoughts.push(thought1._id as mongoose.Types.ObjectId);
    user2.thoughts.push(thought2._id as mongoose.Types.ObjectId);

    await user1.save();
    await user2.save();

    console.log('Seed data created successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  }
};

seedData();
