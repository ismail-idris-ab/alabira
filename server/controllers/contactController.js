const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { sendContactNotification, sendContactConfirmation } = require('../utils/emailService');

const submitContact = async (req, res, next) => {
  try {
    if (req.body.website) return res.status(400).json({ message: 'Invalid submission.' });
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array()[0].msg });

    const { name, email, message } = req.body;
    const contact = await Contact.create({ name, email, message, ipAddress: req.ip, userAgent: req.headers['user-agent'] });

    sendContactNotification(contact).catch((err) => console.error('Contact notification email failed:', err.message));
    sendContactConfirmation(email, name).catch((err) => console.error('Contact confirmation email failed:', err.message));

    res.status(201).json({ message: 'Message received.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { submitContact };
