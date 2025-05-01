import Thought from '../models/Thought.js';
import User from '../models/User.js';
export default {
    // Get all thoughts
    async getAllThoughts(_, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json({ message: 'Error fetching thoughts', error: err });
        }
    },
    // Get a single thought by ID
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
            if (!thought)
                return res.status(404).json({ message: 'Thought not found' });
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json({ message: 'Error fetching thought', error: err });
        }
    },
    // Create a new thought and add it to the user
    async createThought(req, res) {
        try {
            const { thoughtText, username } = req.body;
            const newThought = await Thought.create({ thoughtText, username });
            const user = await User.findOneAndUpdate({ username }, { $push: { thoughts: newThought._id } }, { new: true });
            if (!user)
                return res.status(404).json({ message: 'Thought created but user not found' });
            return res.status(201).json(newThought);
        }
        catch (err) {
            return res.status(500).json({ message: 'Error creating thought', error: err });
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { thoughtText: req.body.thoughtText }, { new: true, runValidators: true });
            if (!updatedThought)
                return res.status(404).json({ message: 'Thought not found' });
            return res.json(updatedThought);
        }
        catch (err) {
            return res.status(500).json({ message: 'Error updating thought', error: err });
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
            if (!thought)
                return res.status(404).json({ message: 'Thought not found' });
            await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
            return res.json({ message: 'Thought deleted successfully' });
        }
        catch (err) {
            return res.status(500).json({ message: 'Error deleting thought', error: err });
        }
    },
    // Add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
            if (!thought)
                return res.status(404).json({ message: 'Thought not found' });
            return res.status(201).json(thought);
        }
        catch (err) {
            return res.status(500).json({ message: 'Error adding reaction', error: err });
        }
    },
    // Remove a reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            if (!thought)
                return res.status(404).json({ message: 'Thought not found' });
            return res.json({ message: 'Reaction removed successfully' });
        }
        catch (err) {
            return res.status(500).json({ message: 'Error removing reaction', error: err });
        }
    },
};
//# sourceMappingURL=thoughtController.js.map