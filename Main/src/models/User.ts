import mongoose, { Document, Types } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];  // Array of ObjectIds for the thoughts
  friends: Types.ObjectId[];   // Array of ObjectIds referencing the User model
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',  // Refers to the Thought model for associated thoughts
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Refers to the User model for the friends array
    },
  ],
});

// Virtual property to get the friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
