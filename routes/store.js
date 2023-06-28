const express = require('express')
const { handleAddBook, handleAllBooks, handleBookId, handleEdit, handleDone, handleDelete } = require('../contoller/storeControl')
const router = express.Router()

router.post("/addbook", handleAddBook)

router.get("/allbooks", handleAllBooks)

router.get("/viewmore/:bookId", handleBookId)

router.patch("/edit/:bookId", handleEdit)

router.patch("/editdone/:bookId", handleDone)

router.delete("/delete/:delId", handleDelete)

module.exports = router
