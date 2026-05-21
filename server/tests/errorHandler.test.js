const request = require('supertest');
const express = require('express');
const errorHandler = require('../middleware/errorHandler');

const makeApp = (thrower) => {
  const a = express();
  a.get('/test', (req, res, next) => thrower(next));
  a.use(errorHandler);
  return a;
};

test('returns statusCode and message from error', async () => {
  const app = makeApp((next) => { const e = new Error('oops'); e.statusCode = 422; next(e); });
  const res = await request(app).get('/test');
  expect(res.status).toBe(422);
  expect(res.body.message).toBe('oops');
});

test('handles Mongoose duplicate key (11000) as 409', async () => {
  const app = makeApp((next) => next({ code: 11000, keyValue: { email: 'x@x.com' } }));
  const res = await request(app).get('/test');
  expect(res.status).toBe(409);
  expect(res.body.message).toMatch(/email/i);
});

test('handles JWT invalid token as 401', async () => {
  const app = makeApp((next) => { const e = new Error('Invalid token.'); e.name = 'JsonWebTokenError'; next(e); });
  const res = await request(app).get('/test');
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Invalid token.');
});

test('handles Mongoose ValidationError as 400', async () => {
  const app = makeApp((next) => {
    const e = new Error('Validation failed');
    e.name = 'ValidationError';
    e.errors = {
      email: { message: 'Email is required' },
      name: { message: 'Name is required' }
    };
    next(e);
  });
  const res = await request(app).get('/test');
  expect(res.status).toBe(400);
  expect(res.body.message).toBeDefined();
});

test('handles TokenExpiredError as 401', async () => {
  const app = makeApp((next) => {
    const e = new Error('Token expired.');
    e.name = 'TokenExpiredError';
    next(e);
  });
  const res = await request(app).get('/test');
  expect(res.status).toBe(401);
  expect(res.body.message).toBe('Token expired.');
});
