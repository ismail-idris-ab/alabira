const mongoose = require('mongoose');
const crypto = require('crypto');
const subscriberSchema = new mongoose.Schema({
  email:            { type: String, required: true, unique: true, trim: true, lowercase: true },
  status:           { type: String, enum: ['active','unsubscribed'], default: 'active' },
  unsubscribeToken: { type: String },
  source:           { type: String, default: 'website' },
  subscribedAt:     { type: Date, default: Date.now },
  unsubscribedAt:   { type: Date },
});
subscriberSchema.pre('save', function (next) {
  if (!this.unsubscribeToken) this.unsubscribeToken = crypto.randomBytes(32).toString('hex');
  next();
});
module.exports = mongoose.model('Subscriber', subscriberSchema);
