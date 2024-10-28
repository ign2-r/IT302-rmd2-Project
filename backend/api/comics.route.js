const express = require('express');
const ComicsController = require('./comics.controller');
// Rockwell Dela Rosa, IT302-451, IT302 Project, rmd2@njit.edu
const router = express.Router();

router.route('/').get(ComicsController.apiGetComics);

module.exports = router;
