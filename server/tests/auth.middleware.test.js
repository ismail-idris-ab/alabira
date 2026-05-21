const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
process.env.JWT_ACCESS_SECRET = 'testsecret';
const { protect, restrictTo } = require('../middleware/auth');

const app = express();
app.use(express.json());
app.get('/protected', protect, (req, res) => res.json({ id: req.admin.id }));
app.get('/superonly', protect, restrictTo('superadmin'), (req, res) => res.json({ ok: true }));

const sign = (payload) => jwt.sign(payload, 'testsecret', { expiresIn: '15m' });

test('rejects request with no token', async () => {
  const res = await request(app).get('/protected');
  expect(res.status).toBe(401);
});

test('allows valid token', async () => {
  const res = await request(app).get('/protected').set('Authorization', `Bearer ${sign({ id: 'abc', role: 'editor' })}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe('abc');
});

test('restrictTo blocks wrong role', async () => {
  const res = await request(app).get('/superonly').set('Authorization', `Bearer ${sign({ id: 'abc', role: 'editor' })}`);
  expect(res.status).toBe(403);
});
