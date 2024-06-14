import express from 'express';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';


// Importing Routes
import userRoute from './routes/user.js';
import productRoute from './routes/product.js'


const PORT = 3000;

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);

// Root route
app.get("/", (req, res) => {
    res.send("Working Great");
});


app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware)

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
