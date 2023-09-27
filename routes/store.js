const express = require('express')
const { handleAddBook, handleAllBooks, handleBookId, handleEdit, handleDone, handleDelete, handleSearch, handleEditBook, handleSaveChanges, handleCancel, handleViewMore } = require('../contoller/storeControl')
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

router.post("/addbook", jwtMiddleWare, handleAddBook)
router.get("/allbooks", handleAllBooks)
router.get("/viewmore/:bookId", handleViewMore)
router.delete("/delete/:bookId", jwtMiddleWare, handleDelete)
router.patch("/edit/:bookId", jwtMiddleWare, handleEditBook)
router.patch("/save/:bookId", jwtMiddleWare, handleSaveChanges)
router.patch('/cancel/:bookId', jwtMiddleWare, handleCancel)
router.post("/searchBook", handleSearch)

module.exports = router
