const { verifyJWT } = require("../../config/AuthMiddleware")
const Review = require("../../models/ReviewModel")

const get_reviews = async (req, res) => {
    try {
        const {id} = req.query
        
        const reviews = await Review.find({schoolId: id}).populate("userId", "username email")
        
        res.send(reviews)
    }

    catch (err) {
        console.log(err)
    }
}

const post_review = async (req, res) => {
    try {
        const userId = verifyJWT(req.cookies.jwt).id
        const {rating, comment, schoolId} = req.body

        const newReview = new Review({rating, comment, userId, schoolId})

        const result = await newReview.save()

        res.send(result)

    }

    catch (err) {
        console.log(err)
    }
}

module.exports = {
    get_reviews,
    post_review
}