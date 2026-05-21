const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema(
  {
    quote:      { type: String, required: true, maxlength: 500 },
    author:     {
      name:     { type: String, required: true },
      role:     { type: String, required: true },
      location: { type: String, required: true },
      avatar:   { type: String },
    },
    type:       { type: String, enum: ['farmer','customer','wholesale'], required: true },
    rating:     { type: Number, min: 1, max: 5, required: true },
    isApproved: { type: Boolean, default: false },
    sortOrder:  { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Testimonial', testimonialSchema);
