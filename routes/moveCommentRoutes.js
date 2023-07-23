const express = require('express');
const router = express.Router();
const movieCommentsController = require('../controllers/movieCommentsController');
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(movieCommentsController.getAllMovieComments)
    .post(movieCommentsController.createNewMovieComment)
    .patch(movieCommentsController.updateMovieComment)
    .delete(movieCommentsController.deleteMovieComment)

module.exports = router;