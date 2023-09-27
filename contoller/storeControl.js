const { Books, Users } = require('../models/bookstoreModel')
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.MyJwt

const handleAddBook = async (req, res) => {
    let { id } = req.userId
    let { name, title, pageNumbers, descr, genre, edit } = req.body
    try {
        let newBook = await Books({ name, title, pageNumbers, descr, genre, edit, uploaderId: id })
        newBook.save()
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

const handleAllBooks = async (req, res) => {
    let allbooks = await Books.find({})
    res.json({ allbooks })
}

const handleBookId = async (req, res) => {
    let { bookId } = req.params
    let foundBook = await Books.findById(bookId)
    let bookUploader = await Users.findById(foundBook.uploaderId)
    let { username } = bookUploader
    let { name, title, pageNumbers, descr, genre, edit, uploaderId, _id } = foundBook
    let foundBookDetails = { username, name, title, pageNumbers, descr, genre, edit, uploaderId }
    res.json({ foundBookDetails })
}

const handleEditBook = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { edit: false })
        let myUploads = await Books.find({ uploaderId: id })
        res.json(myUploads)
    }
    catch (err) { console.error(err) }

}

const handleCancel = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { edit: true })
        let myUploads = await Books.find({ uploaderId: id })
        res.json(myUploads)
    }
    catch (err) { console.error(err) }

}

const handleSaveChanges = async (req, res) => {
    const { bookId } = req.params
    const { data } = req.body
    const { id } = req.userId
    let { name, title, descr, pageNumbers, genre } = data
    let newData = { name, title, descr, pageNumbers, genre }
    try {
        await Books.findByIdAndUpdate(bookId, newData)
        let myUploads = await Books.find({ uploaderId: id })
        res.json(myUploads)
    }
    catch (err) { console.error(err) }
}

const handleDelete = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndRemove(bookId)
        let myUploads = await Books.find({ uploaderId: id })
        res.json(myUploads)
    }
    catch (err) { console.error(err) }
}

const handleSearch = async (req, res) => {
    let { bookName } = req.body
    try {
        let searchedBook = await Books.findOne({ title: bookName })
        if (searchedBook) return res.json({ searchedBook })
        return res.json('Book Does Not Exist')
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { handleDelete, handleSaveChanges, handleEditBook, handleCancel, handleAllBooks, handleBookId, handleAddBook, handleSearch }