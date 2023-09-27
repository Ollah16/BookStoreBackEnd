const { connect, model, Schema } = require('mongoose')

connect(process.env.MONGODB_URI)
    .then(res => console.log('success'))
    .catch(err => console.error(err))

let userSchema = new Schema({
    username: String,
    password: String
})

let Users = model('user', userSchema)

let authorSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    pageNumbers: {
        type: String,
        required: true
    },
    bookDescr: {
        type: String,
        required: true
    },
    bookGenre: {
        type: String,
        required: true
    },
    editBook: {
        type: Boolean,
    },
    uploaderId: {
        type: Schema.Types.ObjectId,
        ref: Users
    }
});
let Books = model("books", authorSchema)
module.exports = { Books, Users };