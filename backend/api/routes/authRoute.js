const express = require('express')
const router = express.Router();
const authControllers = require('../controllers/authController')

router.post('/login', authControllers.login_post);

router.post('/signup', authControllers.signup_post);

router.post('/verify-user', authControllers.post_verify_user)

router.get('/verify', authControllers.verify_get);

router.get('/logout', authControllers.logout_get);

module.exports = router;