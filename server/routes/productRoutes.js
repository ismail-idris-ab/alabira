const express = require('express');
const { body } = require('express-validator');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();
const validation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('category').isIn(['livestock','grains','produce','specialty']).withMessage('Invalid category'),
  body('description').trim().notEmpty().isLength({ max: 500 }),
  body('image.url').notEmpty().withMessage('Image URL required'),
  body('image.alt').notEmpty().withMessage('Image alt required'),
];

router.get('/', getProducts);
router.post('/', protect, restrictTo('superadmin','editor'), validation, createProduct);
router.put('/:id', protect, restrictTo('superadmin','editor'), updateProduct);
router.delete('/:id', protect, restrictTo('superadmin'), deleteProduct);
module.exports = router;
