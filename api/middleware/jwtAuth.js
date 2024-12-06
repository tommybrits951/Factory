const jwt = require("jsonwebtoken")

async function verifyToken(req, res, next) {
    try {
        const { Authorization } = req.headers;
        if (!Authorization) {
            return next()
        }
        const verified = jwt.verify(Authorization.split(" ")[1], process.env.ACCESS_SECRET)
        req.verified = verified
        next()
    } catch (err) {
        next(err)
    }
}

async function checkInv(req, res, next) {
    try {
        const { Authorization } = req.headers
        console.log(Authorization.accessToken)
        const decoded = jwt.decode(JSON.stringify(Authorization).split(" ")[1], process.env.ACCESS_SECRET)
        if (decoded.roles.includes("inventory") || decoded.roles.includes("admin")) {
            return next()
        }
        res.status(401).json({ message: "Not authorized!" })
    } catch (err) {
        next(err)
    }
}


module.exports = {
    verifyToken,
    checkInv
}