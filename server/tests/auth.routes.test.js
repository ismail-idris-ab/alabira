const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
process.env.JWT_ACCESS_SECRET = 'access_secret';
process.env.JWT_REFRESH_SECRET = 'refresh_secret';
process.env.RESEND_API_KEY = 'test';
process.env.FROM_EMAIL = 'x';
process.env.ADMIN_EMAIL = 'x';

jest.mock('../utils/emailService', () => ({
  sendContactNotification: jest.fn().mockResolvedValue({ success: true }),
  sendContactConfirmation: jest.fn().mockResolvedValue({ success: true }),
  sendWelcomeNewsletter: jest.fn().mockResolvedValue({ success: true }),
  sendUnsubscribeConfirmation: jest.fn().mockResolvedValue({ success: true }),
}));

const app = require('../app');
const Admin = require('../models/Admin');

let mongod;
beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}, 30000);
afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});
afterEach(() => Admin.deleteMany({}));

test('POST /api/admin/login returns accessToken for valid credentials', async () => {
  await Admin.create({ name: 'Admin', email: 'a@a.com', password: 'Secure123!', role: 'superadmin' });
  const res = await request(app).post('/api/admin/login').send({ email: 'a@a.com', password: 'Secure123!' });
  expect(res.status).toBe(200);
  expect(res.body.accessToken).toBeDefined();
  expect(res.headers['set-cookie']).toBeDefined();
});

test('POST /api/admin/login returns 401 for wrong password', async () => {
  await Admin.create({ name: 'Admin', email: 'b@b.com', password: 'Secure123!', role: 'editor' });
  const res = await request(app).post('/api/admin/login').send({ email: 'b@b.com', password: 'Wrong!' });
  expect(res.status).toBe(401);
});

test('POST /api/admin/login returns 401 for unknown email', async () => {
  const res = await request(app).post('/api/admin/login').send({ email: 'nobody@a.com', password: 'Pass123!' });
  expect(res.status).toBe(401);
});

test('POST /api/admin/login caps refreshTokens at 5 after repeated logins', async () => {
  await Admin.create({ name: 'Admin', email: 'cap@test.com', password: 'Secure123!', role: 'editor' });

  for (let i = 0; i < 7; i++) {
    await request(app).post('/api/admin/login').send({ email: 'cap@test.com', password: 'Secure123!' });
  }

  const admin = await Admin.findOne({ email: 'cap@test.com' });
  expect(admin.refreshTokens.length).toBeLessThanOrEqual(5);
});
