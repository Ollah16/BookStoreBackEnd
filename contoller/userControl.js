const { Books, Users } = require('../models/bookstoreModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwtSecretKey = process.env.MyJwt

const handleRegistration = async (req, res) => {
    let { username, password } = req.body
    try {
        let salt = await bcrypt.genSalt()
        let myPass = await bcrypt.hash(password, salt)
        let myCheck = await Users.findOne({ username })
        if (!myCheck) {
            let newAuthor = Users({ username, password: myPass })
            newAuthor.save();
            res.json({ message: 'Registration successful' })

        }
        else { res.json({ message: 'User Already Exist' }) }
    }
    catch (error) {
        console.error(error)
    }
}


const handleLogin = async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await Users.findOne({ username })
        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password)
            if (comparePassword) {
                const { username, id } = user
                const accessToken = jwt.sign({ id }, jwtSecretKey)
                res.json({ accessToken, username })
            }
            else { res.json({ message: 'Incorrect Password Or Username' }) }
        }
        else { res.json({ message: 'User does not exist' }) }
    }
    catch (err) { console.error(err) }
}

const handleMyUploads = async (req, res) => {
    let { id } = req.userId

    try {
        let userUploads = await Books.find({ uploaderId: id })
        res.json({ userUploads })
    }
    catch (err) { console.error(err) }
}

module.exports = { handleMyUploads, handleLogin, handleRegistration }