const MovieComment = require('../models/MovieComment');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getAllMovieComments = asyncHandler(async (req, res) => {
    const movieComments = await MovieComment.find().lean();

    if (!movieComments?.length) {
        return res.status(400).json({message: 'No movie comments found'});
    }

    const movieCommentsWithUser = await Promise.all(movieComments.map(async (movieComment) => {
        const user = await User.findById(movieComment.user).lean().exec();
        return {...movieComment, username: user.username};
    }));

    res.json(movieCommentsWithUser);
});

const createNewMovieComment = asyncHandler(async (req, res) => {
    const {user, title, text, movieId, completed} = req.body;

    if (!user || !title || !text || !movieId) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const duplicate = await MovieComment.findOne({title}).lean().exec();

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate movie comment title'});
    }

    const movieComment = await MovieComment.create({user, title, text, movieId});

    if (movieComment) {
        return res.status(201).json({message: 'New movie comment created'});
    } else {
        return res.status(400).json({message: 'Invalid movie comment data received'});
    }
});

const updateMovieComment = asyncHandler(async (req, res) => {
    const {id, user, title, text, movieId, completed} = req.body;

    if (!id || !user || !title || !text || !movieId) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const movieComment = await MovieComment.findById(id).exec();

    if (!movieComment) {
        return res.status(400).json({message: 'Move comment not found'});
    }
    console.log(movieComment)

    const duplicate = await MovieComment.findOne({title}).lean().exec();

    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate movie comment title'});
    }

    movieComment.user = user;
    movieComment.title = title;
    movieComment.text = text;
    movieComment.movieId = movieId;
    movieComment.completed = completed;

    console.log(movieComment)

    const updatedMovieComment = await movieComment.save();

    res.json(`${updatedMovieComment.title} updated`);
});

const deleteMovieComment = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({message: 'MovieComment Id are required'});
    }

    const movieComment = await MovieComment.findById(id).exec();

    if (!movieComment) {
        return res.status(400).json({message: 'MovieComment not found'});
    }

    const result = await movieComment.deleteOne();

    const reply = `MovieComment ${result.title} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllMovieComments,
    createNewMovieComment,
    updateMovieComment,
    deleteMovieComment
}