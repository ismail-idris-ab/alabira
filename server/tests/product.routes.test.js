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
const Product = require('../models/Product');
const adminToken = jwt.sign({ id: 'adminid', role: 'superadmin' }, 'testsecret', { expiresIn: '1h' });
const sample = { name: 'Test Rice', slug: 'test-rice', category: 'grains', description: 'Good rice from Benue State highlands.', image: { url: '/rice.webp', alt: 'Rice' } };

beforeAll(() => mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alabira_test'));
afterAll(() => mongoose.disconnect());
afterEach(() => Product.deleteMany({}));

test('GET /api/products returns active products', async () => {
  await Product.create(sample);
  const res = await request(app).get('/api/products');
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test('GET /api/products?category=grains filters correctly', async () => {
  await Product.create(sample);
  await Product.create({ ...sample, name: 'Cow', slug: 'cow', category: 'livestock' });
  const res = await request(app).get('/api/products?category=grains');
  expect(res.body.every((p) => p.category === 'grains')).toBe(true);
});

test('POST /api/products requires admin token', async () => {
  expect((await request(app).post('/api/products').send(sample)).status).toBe(401);
});

test('POST /api/products creates with valid admin token', async () => {
  const res = await request(app).post('/api/products').set('Authorization', `Bearer ${adminToken}`).send({ ...sample, slug: 'new-rice' });
  expect(res.status).toBe(201);
});

test('DELETE /api/products/:id removes product', async () => {
  const p = await Product.create(sample);
  const res = await request(app).delete(`/api/products/${p._id}`).set('Authorization', `Bearer ${adminToken}`);
  expect(res.status).toBe(200);
  expect(await Product.findById(p._id)).toBeNull();
});
