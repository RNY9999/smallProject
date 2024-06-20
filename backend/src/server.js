import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

const PORT = Number(process.env.PORT);

app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connection');
    socket.on('message', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`server is running\ninfo\nPORT: ${PORT}(${typeof PORT})\nFRONTEND_URL: ${process.env.FRONTEND_URL}(${typeof process.env.FRONTEND_URL})`);
});