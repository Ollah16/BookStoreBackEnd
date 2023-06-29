const { Books, Users } = require('../models/bookstoreModel');
const bcrypt = require('bcrypt');

const handleRegistration = async (req, res) => {
    let { username, password } = req.body
    let salt = await bcrypt.genSalt()
    let myPass = await bcrypt.hash(password, salt)
    let myCheck = await Users.findOne({ username })

    if (!myCheck) {
        try {

            let newAuthor = Users({ username, password: myPass })
            newAuthor.save();

        }
        catch (error) {
            console.error(error)
        }
    }
    else { res.send('User Already Exist') }
}

const handleLogin = async (req, res) => {
    let { username, password } = req.body
    let pCheck = await Users.findOne({ username })
    if (pCheck) {
        let comparePass = await bcrypt.compare(password, pCheck.password)
        if (comparePass) return res.json({ pCheck })
        return res.send('')
    }
}

const handleUploader = async (req, res) => {
    let { userId } = req.params
    try {
        let userName = await Users.findById(userId).select('username')
        res.json({ userName })
    }
    catch (err) { console.error(err) }
}

const handleUploaderId = async (req, res) => {
    let { uploaderId } = req.params
    try {
        let uploaDee = await Users.findById(uploaderId).select("username")
        res.json(uploaDee)
    }
    catch (err) { console.error(err) }
}

const handleUser = async (req, res) => {
    let { userId } = req.params
    try {
        let result = await Books.find({ uploaderId: userId })
        res.json({ result })
    }
    catch (err) { console.error(err) }
}

module.exports = { handleUser, handleUploader, handleLogin, handleRegistration, handleUploaderId }