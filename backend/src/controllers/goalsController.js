const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

/*
    1. @description -> Get Goals
    2. @path -> GET /api/goals/
    3. @access -> Private
*/
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });

    res.status(200).json(goals);
});

/*
    1. @description -> Set Goal
    2. @path -> POST /api/goals/
    3. @access -> Private
*/
const setGoal = asyncHandler(async (req, res) => {
    const goals = await Goal.create({
        text: req.body.text,
    });
    
    if(!req.body.text) {
        res.status(400);

        throw new Error('Add a text field!');
    }

    res.status(200).json(goals);
});

/*
    1. @description -> Update Goal
    2. @path -> PUT /api/goals/:id
    3. @access -> Private
*/
const putGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    
    if(!goal) {
        res.status(404);
        throw new Error('Goal Not Found!');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    );

    res.status(200).json(updatedGoal);
});

/*
    1. @description -> Delete Goal
    2. @path -> DEL /api/goals/:id
    3. @access -> Private
*/
const delGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    
    if(!goal) {
        res.status(404);
        throw new Error('Goal Not Found!');
    }
    
    await goal.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    setGoal,
    putGoal,
    delGoal
}