const express = require('express')
const schoolController = require('../controllers/schoolController')
const { requireAuth } = require('../../config/AuthMiddleware')
const router = express.Router()

router.get('/', schoolController.get_schools)

router.get('/options', requireAuth, schoolController.get_options)

router.get('/filter', requireAuth, schoolController.get_filter)

router.post('/bookmark', requireAuth, schoolController.post_bookmark)



module.exports = router