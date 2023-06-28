const { Books } = require('../models/bookstoreModel')
const handleAddBook = async (req, res) => {
    let { name, title, pageNumbers, descr, genre, edit, uploaderId } = req.body
    try {
        let newBook = Books({ name, title, pageNumbers, descr, genre, edit, uploaderId })
        newBook.save()
        res.send('Book added successfully')
    }
    catch (err) { console.error(err) }
}

const handleAllBooks = async (req, res) => {
    let allbooks = await Books.find({})
    res.json({ allbooks })
}

const handleBookId = async (req, res) => {
    let { bookId } = req.params
    let finder = await Books.findById(bookId)
    res.json({ finder })
}

const handleEdit = async (req, res) => {
    let { bookId } = req.params
    let response = 'edited succesfully'
    let { edit } = req.body

    try {
        let finder = await Books.findByIdAndUpdate(bookId, { edit })
        if (finder) return res.send(response)

    }
    catch (err) { console.error(err) }
}

const handleDone = async (req, res) => {
    let { bookId } = req.params
    let updateArea = { ...req.body }
    let response = 'edited succesfully'
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

module.exports = { handleDelete, handleDone, handleEdit, handleAllBooks, handleBookId, handleAddBook }