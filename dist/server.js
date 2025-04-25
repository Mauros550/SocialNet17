import express from 'express';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';
import db from './config/connection.js';
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
db.once('open', () => {
    app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
});
//# sourceMappingURL=server.js.map