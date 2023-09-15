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
    "skillsToTeach": [ObjectId],  // References to Skills collection
    "skillsToLearn": [ObjectId],  // References to Skills collection
    "matches": [ObjectId],  // Array of user ids who are matched
    "chats": [ObjectId],  // Reference to chat sessions
    "reviews": [ObjectId], // Reference to reviews made about the user
}, { timestamps: true })

const User = mongoose.model('User', userScheme);

module.exports = User;
