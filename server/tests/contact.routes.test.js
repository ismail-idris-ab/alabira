const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.JWT_ACCESS_SECRET = 'testsecret';
process.env.RESEND_API_KEY = 'test';
process.env.FROM_EMAIL = 'x';
process.env.ADMIN_EMAIL = 'x';

jest.mock('../utils/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue({ success: true }),
  sendContactConfirmation: jest.fn().mockResolvedValue({ success: true }),
}));

const app = require('../app');
const Contact = require('../models/Contact');

let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}, 30000);
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
afterEach(() => Contact.deleteMany({}));

test('POST /api/contact saves contact and returns 201', async () => {
  const res = await request(app).post('/api/contact').send({ name: 'Test', email: 'u@t.com', message: 'Hello from the test suite today' });
  expect(res.status).toBe(201);
  expect(res.body.message).toBe('Message received.');
  expect(await Contact.findOne({ email: 'u@t.com' })).not.toBeNull();
});

test('POST /api/contact rejects honeypot trigger', async () => {
  const res = await request(app).post('/api/contact').send({ name: 'Bot', email: 'b@t.com', message: 'Spam', website: 'http://spam.com' });
  expect(res.status).toBe(400);
});

test('POST /api/contact rejects missing fields', async () => {
  const res = await request(app).post('/api/contact').send({ name: 'No email' });
  expect(res.status).toBe(422);
});
