const express = require('express');
const { handleLogin, handleUploader, handleUploaderId, handleUser, handleRegistration } = require('../contoller/userControl');
const router = express.Router()

router.post("/register", handleRegistration);

router.post("/login", handleLogin);

router.get("/fetchuploader/:userId", handleUploader)

router.get("/uploader/:uploaderId", handleUploaderId)

router.get("/fetchuser/:userId", handleUser)

module.exports = router; 