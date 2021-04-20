const express = require('express');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel')

const router = express.Router();

router.use(async (req, res, next) => {
    let token = req.headers["cookie"]
    if(token) {
        token = token.split(' ').filter(c => {
            return c.includes('jwt=')
        })[0].split('=')[1] // if
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if(user){
            req.user = user;
        }
    }
    next()
})

module.exports = router;