import mongoose, { Document, Schema } from 'mongoose';

// Define the IThought interface
export interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: mongoose.Types.ObjectId[];  // Array of ObjectIds for reactions
  formattedCreatedAt?: string; // for the virtual
}

// Create the schema
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction', // Reference to the Reaction model
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get a formatted date
thoughtSchema.virtual('formattedCreatedAt').get(function (this: IThought) {
  return this.createdAt.toLocaleString();
});

// Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);

export default Thought;
