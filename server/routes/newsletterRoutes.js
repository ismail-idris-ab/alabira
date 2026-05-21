const express = require('express');
const { body } = require('express-validator');
const { subscribe, unsubscribe } = require('../controllers/newsletterController');
const { newsletterLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
router.post('/subscribe', newsletterLimiter, [body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail()], subscribe);
router.get('/unsubscribe', unsubscribe);
module.exports = router;
