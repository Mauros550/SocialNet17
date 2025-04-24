import mongoose from 'mongoose';
// Define the User schema
const userSchema = new mongoose.Schema({
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
            ref: 'Thought', // Refers to the Thought model for associated thoughts
        },
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Refers to the User model for the friends array
        },
    ],
});
// Virtual property to get the friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Create the User model
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map