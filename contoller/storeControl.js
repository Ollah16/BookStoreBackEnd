const { Books, Users } = require('../models/bookstoreModel')

const handleAddBook = async (req, res) => {
    let { id } = req.userId
    let { authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook } = req.body
    try {
        let newBook = await Books({ authorName, bookTitle, bookpages, bookGenre, bookDescr, editBook, uploaderId: id })
        newBook.save()
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
    const { bookId } = req.params
    try {
        const book = await Books.findById(bookId)
        const uploader = await Users.findById(book.uploaderId)
        const { username } = uploader
        const { authorName, bookTitle, bookpages, bookGenre, bookDescr } = book
        const viewedBook = { username, authorName, bookTitle, bookpages, bookGenre, bookDescr }
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
    const { authorName, bookTitle, bookpages, bookGenre, bookDescr } = data
    const newBook = { editBook: false, authorName, bookTitle, bookpages, bookGenre, bookDescr }
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
    const { bookTitle } = req.params;
    try {
        const searchedBook = await Books.findOne({
            title: { $regex: new RegExp(bookTitle, 'i') },
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

module.exports = { handleDelete, handleSaveChanges, handleEditBook, handleCancel, handleAllBooks, handleViewMore, handleAddBook, handleSearch }