import { Messages } from '../models/MessagesModel/Messages_20240621a.js';

export const getAllMessages = async (req, res) => {
    console.log('try get all messages');
    const messages = await Messages.find({});

    try {
        res.json(messages);
    } catch(e) {
        res.status(500).send(e);
    }
};

export const postMessage = async (req, res) => {
    console.log('=============================post message=============================');
    console.log(req.body);
    const message = new Messages(req.body);
    console.log(message);

    try {
        await message.save();
        console.log('success save');
        res.send(message);
    } catch (e) {
        res.status(500).send(e);
    }
};