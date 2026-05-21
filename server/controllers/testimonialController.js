const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res, next) => {
  try {
    res.json(await Testimonial.find({ isApproved: true }).sort({ sortOrder: 1 }));
  } catch (err) { next(err); }
};

const createTestimonial = async (req, res, next) => {
  try {
    res.status(201).json(await Testimonial.create(req.body));
  } catch (err) { next(err); }
};

module.exports = { getTestimonials, createTestimonial };
