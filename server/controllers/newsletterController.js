const { validationResult } = require('express-validator');
const Subscriber = require('../models/Subscriber');
const { sendWelcomeNewsletter, sendUnsubscribeConfirmation } = require('../utils/emailService');

const subscribe = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array()[0].msg });

    const { email } = req.body;
    if (await Subscriber.findOne({ email }))
      return res.status(409).json({ message: 'You are already subscribed.' });

    const subscriber = await Subscriber.create({ email });
    sendWelcomeNewsletter(email, subscriber.unsubscribeToken);
    res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (err) {
    next(err);
  }
};

const unsubscribe = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: 'Token required.' });
    const subscriber = await Subscriber.findOne({ unsubscribeToken: token });
    if (!subscriber) return res.status(404).json({ message: 'Token not found.' });
    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();
    sendUnsubscribeConfirmation(subscriber.email);
    res.json({ message: 'You have been unsubscribed.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, unsubscribe };
