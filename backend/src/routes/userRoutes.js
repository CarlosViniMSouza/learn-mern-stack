const express = require('express');
const router = express.Router();

const { 
    registerUser, loginUser, getMe
} = require('../controllers/userController');

const { protected } = require('../middlewares/authMiddleware');

router.get('/me', protected, getMe);
router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;