const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema(
  {
    name:      { type: String, required: [true, 'Name is required'], trim: true, maxlength: 100 },
    email:     { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    message:   { type: String, required: [true, 'Message is required'], maxlength: 2000 },
    status:    { type: String, enum: ['new','read','replied','archived'], default: 'new' },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
module.exports = mongoose.model('Contact', contactSchema);
