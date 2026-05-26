const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.RESEND_API_KEY = 'test';
process.env.FROM_EMAIL = 'x';

jest.mock('../utils/emailService', () => ({
  sendWelcomeNewsletter: jest.fn().mockResolvedValue({ success: true }),
  sendUnsubscribeConfirmation: jest.fn().mockResolvedValue({ success: true }),
}));

const app = require('../app');
const Subscriber = require('../models/Subscriber');

let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}, 30000);
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
afterEach(() => Subscriber.deleteMany({}));

test('POST /api/newsletter/subscribe saves subscriber and returns 201', async () => {
  const res = await request(app).post('/api/newsletter/subscribe').send({ email: 'new@test.com' });
  expect(res.status).toBe(201);
  expect(await Subscriber.findOne({ email: 'new@test.com' })).not.toBeNull();
});

test('POST /api/newsletter/subscribe returns 409 for duplicate', async () => {
  await Subscriber.create({ email: 'dup@test.com' });
  const res = await request(app).post('/api/newsletter/subscribe').send({ email: 'dup@test.com' });
  expect(res.status).toBe(409);
  expect(res.body.message).toMatch(/already subscribed/i);
});

test('GET /api/newsletter/unsubscribe with valid token unsubscribes', async () => {
  const sub = await Subscriber.create({ email: 'unsub@test.com' });
  const res = await request(app).get(`/api/newsletter/unsubscribe?token=${sub.unsubscribeToken}`);
  expect(res.status).toBe(200);
  expect((await Subscriber.findOne({ email: 'unsub@test.com' })).status).toBe('unsubscribed');
});
