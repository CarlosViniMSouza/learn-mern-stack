const express = require('express');
const router = express.Router();

const { 
    getGoals, setGoal, putGoal, delGoal 
} = require('../controllers/goalsController');

const { protected } = require('../middlewares/authMiddleware');

router.route('/')
    .get(protected, getGoals)
    .post(protected, setGoal);

router.route('/:id')
    .put(protected, putGoal)
    .delete(protected, delGoal);

module.exports = router;
