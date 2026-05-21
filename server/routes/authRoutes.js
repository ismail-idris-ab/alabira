const express = require('express');
const { login, refresh, logout } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
router.post('/login', authLimiter, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
module.exports = router;
