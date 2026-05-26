const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res, next) => {
  try {
    res.json({ data: await Testimonial.find({ isApproved: true }).sort({ sortOrder: 1 }) });
  } catch (err) { next(err); }
};

const createTestimonial = async (req, res, next) => {
  try {
    const { quote, author, type, rating, sortOrder } = req.body;
    res.status(201).json(await Testimonial.create({ quote, author, type, rating, sortOrder }));
  } catch (err) { next(err); }
};

module.exports = { getTestimonials, createTestimonial };
