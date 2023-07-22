const express = require('express');
const router = express.Router();
const movieCommentsController = require('../controllers/movieCommentsController');

router.route('/')
    .get(movieCommentsController.getAllMovieComments)
    .post(movieCommentsController.createNewMovieComment)
    .patch(movieCommentsController.updateMovieComment)
    .delete(movieCommentsController.deleteMovieComment)

module.exports = router;