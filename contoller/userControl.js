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
            res.send('registered')
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
            res.json({ accessToken, username, id })
        }

        else { res.send('') }
    }
}

const handleMyUploads = async (req, res) => {
    let { id } = req.userId
    try {
        let myUploads = await Books.find({ uploaderId: id })
        res.json({ myUploads })
    }
    catch (err) { console.error(err) }
}

module.exports = { handleMyUploads, handleLogin, handleRegistration }