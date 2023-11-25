const { Books, Users } = require('../models/bookstoreModel')
const { handleS3Upload, handleS3Delete } = require('./s3')

const handleAddBook = async (req, res) => {
    let { id } = req.userId
    let { author, title, cover, genre, description } = req.body

    handleS3Upload(req.file)

    try {
        let newBook = await Books({ author, title, cover: req.file.originalname, genre, description, edit: false, uploaderId: id })
        await newBook.save()
        const allBooks = await Books.find({})
        res.json({ allBooks })
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
        const { author, title, cover, genre, description } = book
        const viewedBook = { username, author, title, cover, genre, description }
        res.json({ viewedBook })
    }
    catch (err) { console.error(err) }
}

const handleBookEdit = async (req, res) => {
    const { bookId } = req.params
    try {
        await Books.findByIdAndUpdate(bookId, { edit: true })

    }
    catch (err) { console.error(err) }

}

const handleCancel = async (req, res) => {
    const { bookId } = req.params
    const { id } = req.userId
    try {
        await Books.findByIdAndUpdate(bookId, { edit: false })

    }
    catch (err) { console.error(err) }

}

const handleSaveChanges = async (req, res) => {
    const { bookId } = req.params
    const { author, title, genre, description } = req.body

    const bookName = await Books.findById(bookId)
    try {

        if (req.file) {
            await handleS3Delete({ cover: bookName.cover })
            handleS3Upload(req.file)
            const newBook = { author, title, cover: req.file.originalname, genre, description, edit: false }
            await Books.findByIdAndUpdate(bookId, newBook)
            return
        }
        else {
            const newBook = { author, title, genre, description, edit: false }
            await Books.findByIdAndUpdate(bookId, newBook)
        }

    }
    catch (err) { console.error(err) }
}

const handleDelete = async (req, res) => {
    const { bookId } = req.params

    const bookName = await Books.findById(bookId)

    handleS3Delete({ cover: bookName.cover })

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
    handleBookEdit,
    handleDelete,
    handleSaveChanges,
    handleCancel,
    handleAllBooks,
    handleViewMore,
    handleAddBook,
    handleSearch
}