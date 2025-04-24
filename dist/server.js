import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
// Connect to MongoDB
mongoose.connect('mongodb://localhost/social_network')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map