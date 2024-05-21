const express = require('express');
const router = express.Router();
const Review = require('../model/model');

// GET route to fetch all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET by id route to fetch a review by its ID
router.get('/:id', async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// POST route to create a new review
router.post('/', async (req, res) => {
  try {
    const { text, rating, desc, name, email } = req.body;

    // Validate required fields
    if (!text || !rating || !desc || !name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new review instance
    const newReview = new Review({ text, rating, desc, name, email });

    // Save the review to the database
    await newReview.save();

    res.status(201).json({ message: 'Review posted successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update an existing review
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating, desc, name, email } = req.body;

    // Validate required fields
    if (!text || !rating || !desc || !name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find the review by id and update it
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { text, rating, desc, name, email },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully', review: updatedReview });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE route to delete a review
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the review by id and delete it
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
