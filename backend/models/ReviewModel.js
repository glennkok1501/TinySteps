const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid')

const reviewSchema = new Schema({
    _id: {
        type:String,
        default: ()=>uuidv4()
    },
    userId: {
        type: String, 
        ref: "User"
    },
    schoolId: {
        type: String, 
        ref: "School"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    }
    
},{timestamps: true});


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review