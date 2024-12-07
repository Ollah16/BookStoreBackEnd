const express = require('express')
const { handleCounts } = require('../contoller/counterControl')
const router = express.Router()

router.post('/clicks', handleCounts)

module.exports = router 