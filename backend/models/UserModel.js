const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bookmarks: {
        type: [{
            type: String, 
            ref: "School"
        }]
    }
    
},{timestamps: true});

userSchema.pre('save', async function (next) {
    // Hash only if password is modified (for updates)
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User