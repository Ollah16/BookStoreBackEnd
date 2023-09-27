const { Books, Users } = require('../models/bookstoreModel')

const handleAddBook = async (req, res) => {
    let { id } = req.userId
    let { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook } = req.body
    try {
        let newBook = await Books({ authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook, uploaderId: id })
        newBook.save()
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

const handleAllBooks = async (req, res) => {
    try {
        let allbooks = await Books.find({})
        res.json({ allbooks })
    }
    catch (err) { console.error(err) }
}

const handleViewMore = async (req, res) => {
    let { bookId } = req.params
    try {
        let foundBook = await Books.findById(bookId)
        let Uploadedby = await Users.findById(foundBook.uploaderId)
        let { username } = Uploadedby
        let { authorName, bookTitle, bookpages, bookGenre, bookDescr, uploaderId } = foundBook
        let foundBookDetails = { username, authorName, bookTitle, bookpages, bookGenre, bookDescr, uploaderId }
        res.json({ foundBookDetails })
    }
    catch (err) { console.error(err) }
}

const handleEditBook = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { editBook: true })
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }

}

const handleCancel = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { editBook: false })
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }

}

const handleSaveChanges = async (req, res) => {
    const { bookId } = req.params
    const { data } = req.body
    const { id } = req.userId
    const { authorName, bookTitle, bookpages, bookGenre, bookDescr } = data
    const newBook = { editBook: false, authorName, bookTitle, bookpages, bookGenre, bookDescr }
    try {
        await Books.findById(bookId)
        await Books.findByIdAndUpdate(bookId, newBook)
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

const handleDelete = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndDelete(bookId)
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

const handleSearch = async (req, res) => {
    let { bookTitle } = req.params
    try {
        let searchedBook = await Books.findOne({ bookTitle })
        if (searchedBook) return res.json({ searchedBook })
        return res.json('Book Does Not Exist')
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { handleDelete, handleSaveChanges, handleEditBook, handleCancel, handleAllBooks, handleViewMore, handleAddBook, handleSearch }