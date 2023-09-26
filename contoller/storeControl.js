const { Books, Users } = require('../models/bookstoreModel')
const jwt = require("jsonwebtoken")


const handleAddBook = async (req, res) => {
    let { name, title, pageNumbers, descr, genre, edit, myJwt } = req.body
    let checkToken = jwt.verify(myJwt, jwtSecretKey)
    if (checkToken) {
        let { id } = checkToken
        try {
            let newBook = Books({ name, title, pageNumbers, descr, genre, edit, uploaderId: id })
            newBook.save()
            let myUploads = Books.find({ uploaderId: id })
            res.json({ myUploads })
        }
        catch (err) { console.error(err) }
    }
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

const handleEdit = async (req, res) => {
    let { bookId } = req.params
    let { id } = req.userId
    try {
        let foundBook = await Books.findById(bookId)

        if (foundBook.uploaderId == id) {
            let bookToEdit = await Books.findById(bookId)
            if (bookToEdit.edit) {
                let editBook = await Books.findByIdAndUpdate(bookId, { edit: false })
                res.send('granted')
            }
            else {
                let editBook = await Books.findByIdAndUpdate(bookId, { edit: true })
                res.send('granted')
            }
        }
        else { res.send('permission not granted') }
    }
    catch (err) { console.error(err) }


}

const handleDone = async (req, res) => {
    let { bookId } = req.params
    let updateArea = { ...req.body }
    try {
        let finder = await Books.findByIdAndUpdate(bookId, updateArea)
    }
    catch (err) { console.error(err) }
}

const handleDelete = async (req, res) => {
    let { delId } = req.params
    try {
        let uploader = await Books.findByIdAndRemove(delId)
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

module.exports = { handleDelete, handleDone, handleEdit, handleAllBooks, handleBookId, handleAddBook, handleSearch }