const Users = require("../models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const accessSecret = process.env.ACCESS_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;


function buildAccess(user) {
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        roles: [...user.roles]
    }
    const options = {
        expiresIn: "1h"
    }
    return jwt.sign(payload, accessSecret, options)
}
function buildRefresh(user) {
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        roles: [...user.roles]
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, refreshSecret, options)
}


async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email })
        const verified = await bcrypt.compare(password, user.password)
        if (!verified || !user) {
            return res.status(401).json({ message: "Email or password incorrect!" })
        }
        const refreshToken = buildRefresh(user)
        const accessToken = buildAccess(user)
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: false
        })
        res.json({ accessToken })

    } catch (err) {
        next(err)
    }
}

async function verifyRefresh(req, res, next) {
    try {
        const { verified, email } = req;
        if (!verified) {
            const { email } = jwt.decode(req.cookies.jwt)
            const user = await Users.findOne({ email: email })
            if (!user) {
                return res.status(401).json({message: "Not authorized!"})
            }
            const accessToken = buildAccess(user) 
            res.json({accessToken})
        }
        

    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    verifyRefresh
}