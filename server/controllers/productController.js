const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const validId = (id) => mongoose.isValidObjectId(id);

const getProducts = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;
    res.json({ data: await Product.find(filter).sort({ sortOrder: 1 }) });
  } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array()[0].msg });
    const { name, slug, category, description, longDescription, image, tags, sortOrder } = req.body;
    res.status(201).json(await Product.create({ name, slug, category, description, longDescription, image, tags, sortOrder }));
  } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID.' });
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array()[0].msg });
    const { name, slug, category, description, longDescription, image, tags, isActive, sortOrder } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, slug, category, description, longDescription, image, tags, isActive, sortOrder },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) { next(err); }
};

const deleteProduct = async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID.' });
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (err) { next(err); }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
