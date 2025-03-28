require('dotenv').config()
const User = require('../../models/UserModel')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../../config/AuthMiddleware')
const bcrypt = require('bcrypt');
const axios = require('axios');
const ForgotPassword = require('../../models/ForgotPasswordModel');

// create token
const createToken = (id, user, role) => {
    // console.log(process.env.JWT)
    return jwt.sign({id, user, role}, process.env.JWT, {
        expiresIn: 3 * 24 * 60 * 60,
    })
}

const login_post = async (req, res) => {
    const {email, password} = req.body
    
    User.findOne({$or: [
        { email: email }
    ]})
    .then((user) => {

        if (user) {

            // check if user is verified
            if (!user.verified) {
                res.send({"auth":false, "error": "Please verify account"})
                return
            }

            bcrypt.compare(password, user.password)
                .then((auth) => {
                    if (auth){
                        const token = createToken(user.id, user.username, user.email, user.role)
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

    const {username, email, password} = req.body
    const role = 'user'
    var errors = {username: '', email: '', password: ''}
    var valid = true

    // Check password constraint
    const passwd_regex = /^(?=.*\w)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*.,?])[\w\d!@#$%^&*.,?]{8,64}$/;
    if (!password.match(passwd_regex)) {
        errors.password = "Password does not meet complexity requirements";
        valid = false;
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        if (existingUser.username === username) errors.username = "Username already exists";
        if (existingUser.email === email) errors.email = "Email already exists";
        valid = false;
    }

    if (!valid) {
        return res.send({ "auth": false, "error": errors });
    }

    
    try {
        const user = await User.create({username, email, password, role})
        // console.log(user)
        if (user) {
            
            data = {
                "receiver": user.email,
                "subject": "Tiny Steps Verification",
                "body": `Please verify your account using this link ${process.env.FRONTEND}/verify/${user.verification_string}`
            }
            const email_result = await axios.post(`${process.env.MAIL}/send-email`, data)
            if (email_result.data.result) {
                res.send({"auth":true})
                return
            }
        }
        res.send({"auth":false})
    }
    catch (err) {
        console.log(err)
        await User.deleteOne({username})
        res.send({"auth":false})
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

const post_verify_user = async (req, res) => {
    const verification_string = req.body.verification_string
    const user = await User.findOne({verification_string})
    
    // console.log(user)
    if (user) {

        // check if user is already verified
        if (user.verified) {
            res.send({"auth":false})
            return
        }


        user.verified = true
        const updated_user = await user.save()

        if (updated_user) {
            const token = createToken(updated_user._id, updated_user.username, updated_user.role)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            res.send({"auth":true})
            return
        }
    }
    res.send({"auth":false})
}

const post_forgot_password = async (req, res) => {
    const { email } = req.body
    try {

        const user = await User.findOne({email})
        if (!user) {
            res.send({"result":false})
            return
        }

        const forgotPassword = await ForgotPassword.create({email, username: user.username})

            data = {
                "receiver": email,
                "subject": "Tiny Steps Password Reset",
                "body": `Hi ${forgotPassword.username}!\nPlease use this link to set your password ${process.env.FRONTEND}/resetpassword/${forgotPassword._id}`
            }
            const email_result = await axios.post(`${process.env.MAIL}/send-email`, data)
            if (email_result.data.result) {
                res.send({"result":true})
                return
            }
    }
    catch (err) {
        console.log(err)
        res.send({"result":false})
    }
}

const post_reset_password = async (req, res) => {
    const {reset_id, new_password} = req.body

    const passwd_regex = /^(?=.*\w)(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*.,?])[\w\d!@#$%^&*.,?]{8,64}$/;
    if (!new_password.match(passwd_regex)) {
        res.send({"result": false, "error": "Password does not meet complexity requirements"})
        return
    }
    try {
        const forgotPassword = await ForgotPassword.findOne({_id: reset_id})
        if (forgotPassword) {
            if (forgotPassword.used) {
                res.send({"result":false, "error": "Link is expired"})
                return
            }
            const user = await User.findOne({username: forgotPassword.username})
            if (user) {
                user.password = new_password
                const updated_user = await user.save()
                forgotPassword.used = true
                await forgotPassword.save()
                if (updated_user) {
                    const token = createToken(updated_user._id, updated_user.username, updated_user.role)
                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 3 * 24 * 60 * 60 * 1000
                    });
                    res.send({"result":true})
                    return
                }
            }
        }
        res.send({"result":false})
    }
    catch (err) {
        console.log(err)
        res.send({"result":false})
    }
}
    

module.exports = {
    login_post,
    signup_post,
    verify_get,
    logout_get,
    post_verify_user,
    post_forgot_password,
    post_reset_password
}