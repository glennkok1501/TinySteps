const express = require('express')
const { requireAuth } = require('../../config/AuthMiddleware')
const reviewController = require('../controllers/ReviewController')
const router = express.Router()

router.get('/', requireAuth, reviewController.get_reviews)

router.post('/', requireAuth, reviewController.post_review)

module.exports = router