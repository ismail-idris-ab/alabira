const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const adminSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, trim: true, lowercase: true },
    password:      { type: String, required: true, minlength: 8, select: false },
    role:          { type: String, enum: ['superadmin','editor'], default: 'editor' },
    isActive:      { type: Boolean, default: true },
    lastLogin:     { type: Date },
    refreshTokens: [{ type: String }],
  },
  { timestamps: true }
);
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
adminSchema.methods.verifyPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};
module.exports = mongoose.model('Admin', adminSchema);
