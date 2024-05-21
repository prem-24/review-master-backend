const mongoose = require('mongoose');

// Define the schema without a custom id field
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  desc: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Email validation
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
