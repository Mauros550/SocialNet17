import express from 'express';
import Thought from '../models/Thought.js';
import Reaction from '../models/Reaction.js';
const router = express.Router();
// Route to create a new thought
router.post('/', async (req, res) => {
    try {
        const { thoughtText, username } = req.body;
        const newThought = new Thought({
            thoughtText,
            username,
        });
        const savedThought = await newThought.save();
        res.status(201).json(savedThought);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating thought', error: err });
    }
});
// Route to get all thoughts
router.get('/', async (_, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.status(200).json(thoughts);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching thoughts', error: err });
    }
});
// Route to get a single thought by ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.status(200).json(thought);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching thought', error: err });
    }
});
// Route to add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
        // Create new reaction
        const newReaction = new Reaction({
            reactionBody,
            username,
            thoughtId,
        });
        // Save reaction and add it to the thought
        const savedReaction = await newReaction.save();
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            thought.reactions.push(savedReaction._id); // Push reaction to thought
            await thought.save();
            res.status(201).json(savedReaction);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error adding reaction', error: err });
    }
});
// Route to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        // Find the thought and remove the reaction
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            // Remove the reaction by its id from the reactions array
            thought.reactions = thought.reactions.filter((reaction) => reaction.toString() !== reactionId);
            await thought.save();
            res.status(200).json({ message: 'Reaction removed successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting reaction', error: err });
    }
});
// Route to update a thought
router.put('/:thoughtId', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const { thoughtText } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.status(200).json(updatedThought);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error updating thought', error: err });
    }
});
// Route to delete a thought
router.delete('/:thoughtId', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const deletedThought = await Thought.findByIdAndDelete(thoughtId);
        if (!deletedThought) {
            res.status(404).json({ message: 'Thought not found' });
        }
        else {
            res.status(200).json({ message: 'Thought deleted successfully' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting thought', error: err });
    }
});
export default router;
//# sourceMappingURL=thoughtRoutes.js.map