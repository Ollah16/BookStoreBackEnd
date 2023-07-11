const express = require('express')
const { handleAddBook, handleAllBooks, handleBookId, handleEdit, handleDone, handleDelete, handleSearch } = require('../contoller/storeControl')
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

router.post("/addbook", handleAddBook)

router.get("/allbooks", handleAllBooks)

router.get("/viewmore/:bookId", handleBookId)

router.patch("/edit/:bookId", jwtMiddleWare, handleEdit)

router.patch("/editdone/:bookId", handleDone)

router.delete("/delete/:delId", handleDelete)

router.post("/searchBook", handleSearch)

module.exports = router
