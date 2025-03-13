const express = require('express')
const schoolController = require('../controllers/schoolController')
const router = express.Router()

router.get('/', schoolController.get_schools)

module.exports = router