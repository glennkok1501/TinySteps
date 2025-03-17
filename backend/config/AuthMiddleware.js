const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = (token) => {
    
    let verified = null
    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decodedToken) => {
            if (err){
                console.log(err.message);
                // res.redirect('/login')
            }
            else{
                verified = decodedToken
            }
        })
    }
    return verified
}

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.send()
            }
            else{
                next()
            }
        })
    }
    else {
        res.send()
    }
}



module.exports = {
    verifyJWT,
    requireAuth
}