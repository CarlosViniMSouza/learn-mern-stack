const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

/*
    1. @description -> Insert a new user
    2. @path -> POST /api/users/
    3. @access -> Public
*/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);

        throw new Error('Please complete all fields!');
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
        res.status(400);

        throw new Error('User Already Exists!');
    }

    // encrypting password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);

        throw new Error('Invalid user datas!');
    }
});

/*
    1. @description -> Auth a user
    2. @path -> POST /api/users/login
    3. @access -> Public
*/
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    // Login the user
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);

        throw new Error('Invalid credentials!');
    }
});

/*
    1. @description -> Get user data
    2. @path -> GET /api/users/me
    3. @access -> Private
*/
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    
    res.status(200).json({
        id: _id,
        name,
        email,
    });
});

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
}

module.exports = { 
    registerUser, loginUser, getMe
};
