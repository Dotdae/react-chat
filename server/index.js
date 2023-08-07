import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 4000;

// Socket IO server.

const io = new SocketServer(server, {
    cors:{
        origin: '*',
    }
});

app.use(cors());
app.use(morgan('dev'));

// Listen connections.

io.on('connection', (socket) => {


    console.log(`${socket.id} is connected!`);

    socket.on('message', (message) => {
        console.log(`${socket.id}: ${message}`);
        
        // Emit to all clients.

        socket.broadcast.emit('message', {
            body: message,
            from: socket.id
        });

    });

});



server.listen(PORT);
console.log(`Server running on port ${PORT}`);