const express = require('express');
const FeedbackController = require('./feedback.controller');
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
const router = express.Router();

// Route to add new feedback (POST request)
router.post('/', FeedbackController.apiAddFeedback);

// Route to update feedback (PUT request)
router.put('/', FeedbackController.apiUpdateFeedback);

// Route to delete feedback (DELETE request)
router.delete('/', FeedbackController.apiDeleteFeedback);

module.exports = router;
