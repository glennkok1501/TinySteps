const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid')

const forgotPasswordSchema = new Schema({
    _id: {
        type:String,
        default: ()=>uuidv4()
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    used: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);
module.exports = ForgotPassword