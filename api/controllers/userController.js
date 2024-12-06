const bcrypt = require("bcrypt")
const Users = require("../models/Users")


async function register(req, res) {
    try {
        const {firstName, lastName, email, password, roles, phone} = req.body
        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({message: "All fields required!"})
        }
        const duplicatePhone = await Users.findOne({phone}).lean()
        if (duplicatePhone) {
            return res.status(400).json({message: "Phone number already in use!"})
        }
        const duplicateEmail = await Users.findOne({email}).lean()
        if (duplicateEmail) {
            return res.status(400).json({message: "Email already in use!"})
        }
        const hashed = await bcrypt.hash(password, 10)
        const results = await Users.create({...req.body, password: hashed})
        if (results) {
            res.status(201).json({message: `User ${firstName} ${lastName} created!`})
        }
    } catch (err) {
        return res.status(500).json({message: "Problem registering user!"})
    }
}
async function getAllUsers(req, res, next) {
    try {
        const users = await Users.find().exec()
        let arr = [] 
        for (let i = 0; i < users.length; i++) {
            const person = {...users[i], password: undefined, roles: undefined}
            arr.push(person)
        }
        if (!arr) {
            res.status(500).json({message: "something's wronge"})
        }
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    register,
    getAllUsers
}