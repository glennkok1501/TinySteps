const express = require('express')
const schoolController = require('../controllers/schoolController')
const router = express.Router()

router.get('/', schoolController.get_schools)

router.get('/options', schoolController.get_options)

router.get('/filter', schoolController.get_filter)


module.exports = router