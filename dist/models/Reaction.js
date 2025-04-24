import mongoose from 'mongoose';
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => createdAt.toLocaleString(), // Format date
    },
});
// Create the Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema);
export default Reaction; // Default export
//# sourceMappingURL=Reaction.js.map