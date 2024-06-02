import express from 'express';

// Importing Routes
import userRoute from './routes/user.js';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';

const PORT = 3000;

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api/v1/user', userRoute);

// Root route
app.get("/", (req, res) => {
    res.send("Working Great");
});

app.use(errorMiddleware)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
