const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const reviewSchema = Schema({
   "reviewer": ObjectId,  // User who wrote the review
   "reviewee": ObjectId,  // User who the review is about
   "rating": Number,  // 1 to 5
   "text": String,  // Review text
   "createdAt": Date,
   "updatedAt": Date
}, { timestamps: true })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
