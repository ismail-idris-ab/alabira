const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true, trim: true },
    slug:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    category:        { type: String, required: true, enum: ['livestock','grains','produce','specialty'] },
    description:     { type: String, required: true, maxlength: 500 },
    longDescription: { type: String },
    image:           { url: { type: String, required: true }, alt: { type: String, required: true } },
    tags:            [{ type: String, trim: true }],
    isActive:        { type: Boolean, default: true },
    sortOrder:       { type: Number, default: 0 },
  },
  { timestamps: true }
);
productSchema.index({ category: 1, isActive: 1 });
module.exports = mongoose.model('Product', productSchema);
