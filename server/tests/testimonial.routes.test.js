const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
process.env.JWT_ACCESS_SECRET = 'testsecret';
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
const Testimonial = require('../models/Testimonial');
const adminToken = jwt.sign({ id: 'adminid', role: 'superadmin' }, 'testsecret', { expiresIn: '1h' });
const sample = { quote: 'Amazing quality from Alabira farms.', author: { name: 'Ibrahim Musa', role: 'Farmer', location: 'Jos' }, type: 'farmer', rating: 5, isApproved: true };

beforeAll(() => mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alabira_test'));
afterAll(() => mongoose.disconnect());
afterEach(() => Testimonial.deleteMany({}));

test('GET /api/testimonials returns only approved', async () => {
  await Testimonial.create(sample);
  await Testimonial.create({ ...sample, author: { ...sample.author, name: 'Pending' }, isApproved: false });
  const res = await request(app).get('/api/testimonials');
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].author.name).toBe('Ibrahim Musa');
});

test('POST /api/testimonials requires admin token', async () => {
  expect((await request(app).post('/api/testimonials').send(sample)).status).toBe(401);
});

test('POST /api/testimonials creates with admin token', async () => {
  const res = await request(app).post('/api/testimonials').set('Authorization', `Bearer ${adminToken}`).send(sample);
  expect(res.status).toBe(201);
});
