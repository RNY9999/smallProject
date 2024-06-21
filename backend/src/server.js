import cors from 'cors';
import dotenv from 'dotenv';
import { default as express } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import messagesAPI from './api/messages.js';

dotenv.config();

//.env内の定数
const PORT = Number(process.env.PORT);
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connection mongoDB');
    })
    .catch((e) => {
        console.log(`not connect mongoDB\n${e}`);
    });


app.use(cors());
app.use(express.json());

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

app.use('/api', messagesAPI);

server.listen(PORT, () => {
    console.log(`server is running\n======INFORMATION======\nPORT: ${PORT}(typeof:${typeof PORT})\nFRONTEND_URL: ${FRONTEND_URL}(typeof:${typeof FRONTEND_URL})\nMONGO_URI: ${MONGO_URI}(typeof:${typeof MONGO_URI})`);
});