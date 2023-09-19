const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const userScheme = new Schema({
    "username": String,
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true
    },
    "authProvider": {
        "google": {
            "id": String,
            "token": String
        }
    },
    "profile": {
        "fullName": {
            type: String,
            required: true
        },
        "bio": String,
        "location": String,
        "avatar": String,  // URL to the image
        "rating": Number,  // Average rating from reviews
    },
    "skillsToTeach": [String],  // Array of skill names
    "skillsToLearn": [String],  // Array of skill names
    "matches": [{
        type: ObjectId,
        ref: 'User'  // Assuming 'User' is the name of the referenced model
    }],
    "chats": [{
        type: ObjectId,
        ref: 'Chat'  // Assuming 'Chat' is the name of the referenced model
    }],
    "reviews": [{
        type: ObjectId,
        ref: 'Review'  // Assuming 'Review' is the name of the referenced model
    }],
}, { timestamps: true });

const User = mongoose.model('User', userScheme);

module.exports = User;
