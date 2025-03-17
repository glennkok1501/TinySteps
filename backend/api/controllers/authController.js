require('dotenv').config()
const User = require('../../models/UserModel')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const authMiddleware = require('../../config/AuthMiddleware')
const bcrypt = require('bcrypt');

// create token
const createToken = (id, user, role) => {
    console.log(process.env.JWT)
    return jwt.sign({id, user, role}, process.env.JWT, {
        expiresIn: 3 * 24 * 60 * 60,
    })
}

const login_post = async (req, res) => {
    const {username, password} = req.body
    
    User.findOne({$or: [
        { username: username },
        { email: username }
    ]})
    .then((user) => {
        if (user) {
            bcrypt.compare(password, user.password)
                .then((auth) => {
                    if (auth){
                        const token = createToken(user.id, user.username, user.role)
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: 3 * 24 * 60 * 60 * 1000
                        });
                        res.send({"auth":true})
                    }
                    else{
                        res.send({"auth":false, "error": "Password Incorrect"})
                    }
                })
        } else{
            res.send({"auth":false, "error": "Account not found"})
        }
    })
    .catch((err) => console.log(err))

}

const signup_post = async (req, res) => {

    //TODO verification
    const {username, email, password} = req.body
    const role = 'user'
    
    try {
        const user = await User.create({username, email, password, role})
        console.log(user)
        if (user) {
            const token = createToken(user._id, user.username, role)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            res.send({"auth":true})
        }
    }
    catch (err) {
        console.log(err)
        res.send({"auth":false, "error":errors})
    }
}

const verify_get = async (req, res) => {
    const token = authMiddleware.verifyJWT(req.cookies.jwt)
    
    if (token) {
        const user = await User.findOne({_id: token.id})
        try {
            if (user) {
                res.send(user)
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    else {
        res.send(null)
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.status(200).send("Logout")
}

module.exports = {
    login_post,
    signup_post,
    verify_get,
    logout_get
}