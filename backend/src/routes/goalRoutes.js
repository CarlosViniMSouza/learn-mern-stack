const express = require('express');
const router = express.Router();

const { 
    getGoals, setGoal, putGoal, delGoal 
} = require('../controllers/goalsController');

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(putGoal).delete(delGoal);

module.exports = router;