import { Router } from 'express';
import { getAllMessages, postMessage } from "../controllers/messagesControllers.js";

const messagesRouter = Router();

messagesRouter.get('/getAllMessages', getAllMessages);

messagesRouter.post('/postMessage', postMessage)

export default messagesRouter;