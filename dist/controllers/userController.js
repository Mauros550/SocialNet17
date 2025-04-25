import User from '../models/User.js';
import Thought from '../models/Thought.js';
export const getUsers = async (_, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users", error: err });
    }
};
export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
};
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating user", error: err });
    }
};
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        });
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating user", error: err });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        await Thought.deleteMany({ username: deletedUser.username });
        res.json({ message: 'User and associated thoughts deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
};
export const addFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
        if (!user || !friend) {
            res.status(404).json({ message: 'User or friend not found' });
            return;
        }
        if (user.friends.includes(friend._id)) {
            res.status(400).json({ message: 'Already friends' });
            return;
        }
        user.friends.push(friend._id);
        await user.save();
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Error adding friend", error: err });
        return;
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.friends = user.friends.filter((friend) => friend.toString() !== req.params.friendId);
        await user.save();
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json({ message: "Error removing friend", error: err });
        return;
    }
};
//# sourceMappingURL=userController.js.map