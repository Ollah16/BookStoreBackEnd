const express = require('express');
const { handleLogin, handleUploader, handleUserUploads, handleRegistration, handleUploaderId, handleUserId, handleMyUploads } = require('../contoller/userControl');
const router = express.Router()
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.MyJwt

const jwtMiddleWare = async (req, res, next) => {
    let { authorization } = req.headers
    let [, myJwt] = authorization.split(' ')
    let userId = await jwt.verify(myJwt, jwtSecretKey)
    if (userId) {
        req.userId = userId
        next()
    }
    else {
        res.send('Cannot Execute Request')
    }
}

router.post("/register", handleRegistration);

router.post("/login", handleLogin);

router.get("/fetchuserUploads", jwtMiddleWare, handleMyUploads)

module.exports = router; 
