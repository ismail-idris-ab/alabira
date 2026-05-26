jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}));
process.env.RESEND_API_KEY = 'test';
process.env.FROM_EMAIL = 'Test <noreply@test.com>';
process.env.ADMIN_EMAIL = 'admin@test.com';

const {
  sendContactNotification,
  sendContactConfirmation,
  sendWelcomeNewsletter,
  sendUnsubscribeConfirmation,
} = require('../utils/emailService');

const { Resend } = require('resend');
const contact = { name: 'Test', email: 'u@t.com', message: 'Hi', createdAt: new Date(), ipAddress: '127.0.0.1' };

test('sendContactNotification returns success:true', async () => {
  expect((await sendContactNotification(contact)).success).toBe(true);
});

test('sendContactConfirmation returns success:true', async () => {
  expect((await sendContactConfirmation('u@t.com', 'Test')).success).toBe(true);
});

test('sendWelcomeNewsletter returns success:true', async () => {
  expect((await sendWelcomeNewsletter('sub@t.com', 'abc123token')).success).toBe(true);
});

test('email templates do not contain stray brand name artifacts', async () => {
  const sendSpy = Resend.mock.results[0].value.emails.send;

  await sendContactNotification(contact);
  await sendContactConfirmation('u@t.com', 'Test');
  await sendWelcomeNewsletter('sub@t.com', 'token123');
  await sendUnsubscribeConfirmation('sub@t.com');

  for (const call of sendSpy.mock.calls) {
    const html = call[0].html;
    expect(html).not.toMatch(/tilde/i);
  }
});

test('returns success:false (no throw) on SDK error', async () => {
  // Reset modules so we can require a fresh emailService with a broken resend instance
  jest.resetModules();
  // Re-mock resend with a failing send function
  jest.mock('resend', () => ({
    Resend: jest.fn().mockImplementation(() => ({
      emails: { send: jest.fn().mockRejectedValue(new Error('SDK error')) },
    })),
  }));
  const { sendContactNotification: fn } = require('../utils/emailService');
  const result = await fn({ name: 'X', email: 'x@x.com', message: 'x', createdAt: new Date() });
  expect(result.success).toBe(false);
  expect(result.error).toBeDefined();
});
