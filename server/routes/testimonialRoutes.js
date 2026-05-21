const express = require('express');
const { getTestimonials, createTestimonial } = require('../controllers/testimonialController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();
router.get('/', getTestimonials);
router.post('/', protect, restrictTo('superadmin','editor'), createTestimonial);
module.exports = router;
