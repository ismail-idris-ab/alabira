const express = require('express');
const { body } = require('express-validator');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();
const createValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('category').isIn(['livestock','grains','produce','specialty']).withMessage('Invalid category'),
  body('description').trim().notEmpty().isLength({ max: 500 }),
  body('image.url').notEmpty().withMessage('Image URL required'),
  body('image.alt').notEmpty().withMessage('Image alt required'),
];

const updateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('slug').optional().trim().notEmpty().withMessage('Slug cannot be empty'),
  body('category').optional().isIn(['livestock','grains','produce','specialty']).withMessage('Invalid category'),
  body('description').optional().trim().notEmpty().isLength({ max: 500 }),
  body('image.url').optional().notEmpty().withMessage('Image URL cannot be empty'),
  body('image.alt').optional().notEmpty().withMessage('Image alt cannot be empty'),
];

router.get('/', getProducts);
router.post('/', protect, restrictTo('superadmin','editor'), createValidation, createProduct);
router.put('/:id', protect, restrictTo('superadmin','editor'), updateValidation, updateProduct);
router.delete('/:id', protect, restrictTo('superadmin'), deleteProduct);
module.exports = router;
