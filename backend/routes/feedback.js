const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// GET /api/feedback - Return all feedback entries
router.get('/', async (req, res) => {
  try {
    // Check if mongoose is connected
    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database not connected',
        message: 'Please check MongoDB connection and try again'
      });
    }
    
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// POST /api/feedback - Save new feedback in MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }

    if (name.trim().length === 0 || message.trim().length === 0) {
      return res.status(400).json({ error: 'Name and message cannot be empty' });
    }

    // Check if mongoose is connected
    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ 
        error: 'Database not connected',
        message: 'Please check MongoDB connection and try again'
      });
    }

    // Create new feedback
    const feedback = new Feedback({
      name: name.trim(),
      message: message.trim()
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

module.exports = router;
