const asyncHandler = require('express-async-handler');

/*
    1. @description -> Get Goals
    2. @path -> GET /api/goals/
    3. @access -> Private
*/
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Goals' });
});

/*
    1. @description -> Set Goal
    2. @path -> POST /api/goals/
    3. @access -> Private
*/
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);

        throw new Error('Add a text field!');
    }

    res.status(200).json({ message: 'Post Goal' });
});

/*
    1. @description -> Update Goal
    2. @path -> PUT /api/goals/:id
    3. @access -> Private
*/
const putGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Goal -> ${req.params.id}` });
});

/*
    1. @description -> Delete Goal
    2. @path -> DEL /api/goals/:id
    3. @access -> Private
*/
const delGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Goal -> ${req.params.id}` });
});

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    delGoal
}