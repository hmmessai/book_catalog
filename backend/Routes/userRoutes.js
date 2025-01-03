const express = require('express');
const router = express.Router();

const { register, login, logout, protect, getUser } = require('../Controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/currentUser', protect, getUser)

module.exports = router;