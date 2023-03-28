import express, { Express, Request, Response } from "express";
import cors from 'cors';
import './mongo/config'
import * as http from "http";
import * as socketio from 'socket.io';
import dotenv from "dotenv";
import { ClientToServerEvents, Message, ServerToClientEvents } from "./helpers/interfaces";
import { messageModel } from "./models/Login";

const app: Express = express();

const server = http.createServer(app);

const io = new socketio.Server<
  ClientToServerEvents,
  ServerToClientEvents
>(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    socket.on('clientMessage', async (message) => {
        const newMessage = new messageModel(message);
        await newMessage.save();
        const getMessages = await messageModel.find<Message>();
        socket.emit('serverMessage', getMessages);
    });
    socket.on('clientSearchMessagess', async () => {
        const getMessages = await messageModel.find<Message>();
        socket.emit('serverSearchMessagess', getMessages);
    });
});

dotenv.config();

const PORT: string | undefined = process.env.PORT;

app.set("PORT", PORT);

app.use(express.json());

app.use(cors());

server.listen(PORT, () => {
    console.log('Server running on PORT ' + PORT);
});