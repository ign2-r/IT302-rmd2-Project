const express = require('express');
const ComicsController = require('./comics.controller');

const router = express.Router();

router.route('/').get(ComicsController.apiGetComics);

module.exports = router;
