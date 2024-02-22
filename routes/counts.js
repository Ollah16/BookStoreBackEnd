const express = require('express')
const { handleCounts } = require('../contoller/counterControl')
const router = express.Router()

router.post('/count', handleCounts)

module.exports = router 