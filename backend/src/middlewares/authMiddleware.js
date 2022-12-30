const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

const protected = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 1. Get token from header
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user from token
            req.user = await User.findById(decoded.id).select('password');

            next();
        } catch (error) {
            res.status(401);

            throw new Error('Not authorized!');
        }
    }

    if(!token) {
        res.status(401);

        throw new Error('No token authorized!');
    }
});

module.exports = { protected };
