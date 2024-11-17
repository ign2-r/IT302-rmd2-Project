const express = require('express');
const ComicsController = require('./comics.controller');
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
const router = express.Router();

// Route for data records with a filter
router.route('/').get(ComicsController.apiGetComics);

// Route for a single data record
router.route('/id/:id').get(ComicsController.apiGetComicById);

module.exports = router;
