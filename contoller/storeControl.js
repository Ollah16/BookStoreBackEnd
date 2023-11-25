const { Books, Users } = require('../models/bookstoreModel')
const { handleS3Upload } = require('./s3')

const handleAddBook = async (req, res) => {
    let { id } = req.userId
    let { author, title, image, genre, description } = req.body
    console.log(req.file)
    handleS3Upload(req.file)

    try {
        let newBook = await Books({ author, title, image, genre, description, edit: false, uploaderId: id })
        newBook.save()
    }
    catch (err) { console.error(err) }
}

const handleAllBooks = async (req, res) => {
    try {
        const allBooks = await Books.find({})
        res.json({ allBooks })
    }
    catch (err) { console.error(err) }
}

const handleViewMore = async (req, res) => {
    const { bookId } = req.params
    try {
        const book = await Books.findById(bookId)
        const uploader = await Users.findById(book.uploaderId)
        const { username } = uploader
        const { author, title, image, genre, description } = book
        const viewedBook = { username, author, title, image, genre, description }
        res.json({ viewedBook })
    }
    catch (err) { console.error(err) }
}

const handleEditBook = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { editBook: true })
    }
    catch (err) { console.error(err) }

}

const handleCancel = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { editBook: false })
    }
    catch (err) { console.error(err) }

}

const handleSaveChanges = async (req, res) => {
    const { bookId } = req.params
    const { data } = req.body
    const { author, title, image, genre, description } = data
    const newBook = { editBook: false, author, title, image, genre, description }
    try {
        await Books.findByIdAndUpdate(bookId, newBook)
    }
    catch (err) { console.error(err) }
}

const handleDelete = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndDelete(bookId)
    }
    catch (err) { console.error(err) }
}

const handleSearch = async (req, res) => {
    const { title } = req.params;
    try {
        const searchedBook = await Books.findOne({
            title: { $regex: new RegExp(title, 'i') }
        });
        if (searchedBook) {
            return res.json({ searchedBook });
        }
        return res.json({ message: 'Book Does Not Exist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while searching for the book.' });
    }
};

module.exports = {
    handleDelete,
    handleSaveChanges,
    handleEditBook,
    handleCancel,
    handleAllBooks,
    handleViewMore,
    handleAddBook,
    handleSearch
}