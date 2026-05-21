const mongoose = require('mongoose');

beforeAll(async () => {
  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);
  } else {
    await mongoose.connect('mongodb://127.0.0.1:27017/alabira_test');
  }
}, 120000);

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Contact', () => {
  const Contact = require('../models/Contact');
  afterEach(() => Contact.deleteMany({}));

  test('saves with status defaulting to new', async () => {
    const doc = await Contact.create({ name: 'Test', email: 'a@a.com', message: 'Hello world here' });
    expect(doc.status).toBe('new');
    expect(doc._id).toBeDefined();
  });

  test('rejects missing email', async () => {
    await expect(Contact.create({ name: 'X', message: 'y' })).rejects.toThrow();
  });
});

describe('Subscriber', () => {
  const Subscriber = require('../models/Subscriber');
  afterEach(() => Subscriber.deleteMany({}));

  test('auto-generates 64-char unsubscribeToken', async () => {
    const sub = await Subscriber.create({ email: 'sub@test.com' });
    expect(sub.unsubscribeToken).toHaveLength(64);
    expect(sub.status).toBe('active');
  });

  test('rejects duplicate email', async () => {
    await Subscriber.create({ email: 'dup@test.com' });
    await expect(Subscriber.create({ email: 'dup@test.com' })).rejects.toThrow();
  });
});

describe('Product', () => {
  const Product = require('../models/Product');
  afterEach(() => Product.deleteMany({}));

  test('saves with isActive defaulting to true', async () => {
    const p = await Product.create({
      name: 'Rice', slug: 'rice', category: 'grains',
      description: 'Good rice from Benue State.',
      image: { url: '/rice.webp', alt: 'Rice' },
    });
    expect(p.isActive).toBe(true);
  });

  test('rejects invalid category', async () => {
    await expect(Product.create({
      name: 'X', slug: 'x', category: 'invalid', description: 'x', image: { url: '/x.webp', alt: 'x' },
    })).rejects.toThrow();
  });
});

describe('Testimonial', () => {
  const Testimonial = require('../models/Testimonial');
  afterEach(() => Testimonial.deleteMany({}));

  test('saves with isApproved defaulting to false', async () => {
    const t = await Testimonial.create({
      quote: 'Great products from Alabira.',
      author: { name: 'A', role: 'Farmer', location: 'Jos' },
      type: 'farmer', rating: 5,
    });
    expect(t.isApproved).toBe(false);
  });

  test('rejects rating > 5', async () => {
    await expect(Testimonial.create({
      quote: 'X', author: { name: 'A', role: 'B', location: 'C' }, type: 'farmer', rating: 6,
    })).rejects.toThrow();
  });
});

describe('Admin', () => {
  const Admin = require('../models/Admin');
  afterEach(() => Admin.deleteMany({}));

  test('hashes password on save', async () => {
    const admin = await Admin.create({ name: 'A', email: 'a@a.com', password: 'Secret123!', role: 'superadmin' });
    expect(admin.password).not.toBe('Secret123!');
    expect(admin.password).toMatch(/^\$2b\$/);
  });

  test('verifyPassword returns true for correct password', async () => {
    await Admin.create({ name: 'A', email: 'b@b.com', password: 'Secret123!', role: 'editor' });
    const found = await Admin.findOne({ email: 'b@b.com' }).select('+password');
    expect(await found.verifyPassword('Secret123!')).toBe(true);
    expect(await found.verifyPassword('WrongPass')).toBe(false);
  });
});
