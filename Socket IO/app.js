const express = require('express')
const app = express()
const path = require('path') // Define the path for ejs setup

// Set up the socket.io
const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

// Setup the ejs
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

io.on("connection", (socket) => {
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data})
    })

    socket.on("disconnect", ()=>{
        io.emit("user-disconnect", socket.id)
    })
})

app.get('/', (req, res) => {
    res.render("index")
})

server.listen(3000, () => {
    console.log("Server is running")
})
