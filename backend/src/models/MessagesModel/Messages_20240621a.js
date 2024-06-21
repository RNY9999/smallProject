import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
        // timestamp: true,
    },
});

export const Messages = mongoose.model('Messages', MessagesSchema);