const { connect, Schema, model } = require('mongoose')
connect(process.env.MONGODB_URI)
    .then(res => console.log('success'))
    .catch(err => console.error(err))

let userSchema = new Schema({
    username: String,
    password: String
})
let Users = model('user', userSchema)
let authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    pageNumbers: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    edit: {
        type: Boolean,
    },
    uploaderId: {
        type: Schema.Types.ObjectId,
        ref: Users
    }
});
let Books = model("books", authorSchema)
module.exports = { Books, Users };