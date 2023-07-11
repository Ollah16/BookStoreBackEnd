const { Books, Users } = require('../models/bookstoreModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.MyJwt

const handleRegistration = async (req, res) => {
    let { username, password } = req.body
    let salt = await bcrypt.genSalt()
    let myPass = await bcrypt.hash(password, salt)
    let myCheck = await Users.findOne({ username })

    if (!myCheck) {
        try {
            let newAuthor = Users({ username, password: myPass })
            newAuthor.save();
            let userDetail = await Users.findOne({ username: username })
            if (userDetail) {
                let { id, username } = userDetail
                let accessToken = jwt.sign({ id }, jwtSecretKey)
                res.json({ accessToken, username })
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    else { res.send('User Already Exist') }
}


const handleLogin = async (req, res) => {
    let { username, password } = req.body
    let userDetail = await Users.findOne({ username })
    if (userDetail) {
        let comparePass = await bcrypt.compare(password, userDetail.password)
        if (comparePass) {
            let { username, id } = userDetail
            let accessToken = jwt.sign({ id }, jwtSecretKey)
            res.json({ accessToken, username })
        }

        else { res.send('') }
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

const handleUserUploads = async (req, res) => {
    let { id } = req.userId
    try {
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

module.exports = { handleUserUploads, handleUploader, handleLogin, handleRegistration, handleUploaderId }