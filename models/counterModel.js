const { connect, Schema, model } = require('mongoose')

connect(process.env.MONGODB_URI)
    .then(res => console.log('success'))
    .catch(err => console.error(err))

let counterSchema = new Schema({
    counterRecord: {
        type: Number,
        required: true
    }
})

let Counter = model('counts', counterSchema)

module.exports = { Counter }