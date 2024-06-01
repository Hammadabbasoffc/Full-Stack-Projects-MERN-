import express from 'express'
const PORT = 3000;

const app = express()

app.get("/",(req, res)=>{
    res.send("Hello Word")
})

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
    
})