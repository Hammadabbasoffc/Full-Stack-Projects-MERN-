import express from 'express'


// importing Routes
import userRoute from './routes/user.js'
import { connectDB } from './utils/features.js';


const PORT = 3000;
connectDB()


const app = express()

app.use(express.json())





app.use('/api/v1/user', userRoute);


app.get("/",(req, res)=>{
    res.send("Working Great")
})



app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
    
})