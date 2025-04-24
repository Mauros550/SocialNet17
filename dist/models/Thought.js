import mongoose, { Schema } from 'mongoose';
// Create the schema
const thoughtSchema = new Schema({
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
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Virtual to get a formatted date
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString();
});
// Virtual to count reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = mongoose.model('Thought', thoughtSchema);
export default Thought;
//# sourceMappingURL=Thought.js.map