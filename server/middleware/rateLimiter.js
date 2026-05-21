const rateLimit = require('express-rate-limit');

const make = (max, windowMs = 60_000) => rateLimit({
  windowMs, max, standardHeaders: true, legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

module.exports = {
  contactLimiter:    make(10),
  newsletterLimiter: make(5),
  authLimiter:       make(10, 15 * 60_000),
};
