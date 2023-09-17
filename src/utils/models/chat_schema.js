const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');


const chatSchema = Schema({
    "participants": [ObjectId], // User ids involved in the chat
    "messages": [
        {
            "sender": ObjectId,
            "text": String,
            "timestamp": Date
        }
    ],
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
