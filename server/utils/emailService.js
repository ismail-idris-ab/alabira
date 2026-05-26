const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = (str) => String(str ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#x27;');

const wrap = (title, body) => `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F0E6;font-family:sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 0;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:#2E6B3E;padding:32px 40px;border-radius:12px 12px 0 0;">
  <h1 style="margin:0;color:#fff;font-size:22px;font-family:Georgia,serif;">Alabira Global Farm</h1>
  <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">${title}</p>
</td></tr>
<tr><td style="background:#F5F0E6;padding:40px;font-size:16px;color:#4A3B32;line-height:1.6;">${body}</td></tr>
<tr><td style="background:#4A3B32;padding:20px 40px;border-radius:0 0 12px 12px;text-align:center;">
  <p style="margin:0;color:rgba(255,255,255,0.6);font-size:12px;">© 2025 Alabira Global Farm ·
  <a href="https://alabiraglobalfarm.com" style="color:rgba(255,255,255,0.8);">alabiraglobalfarm.com</a></p>
</td></tr>
</table></td></tr></table></body></html>`;

const send = async (to, subject, html) => {
  try {
    await resend.emails.send({ from: process.env.FROM_EMAIL, to, subject, html });
    return { success: true };
  } catch (error) {
    console.error(`Email error [${subject}]:`, error.message);
    return { success: false, error: error.message };
  }
};

const sendContactNotification = (contact) => {
  const date = new Date(contact.createdAt).toLocaleString('en-NG', { timeZone: 'Africa/Lagos' });
  const name = escapeHtml(contact.name);
  const email = escapeHtml(contact.email);
  const message = escapeHtml(contact.message);
  return send(
    process.env.ADMIN_EMAIL,
    `New Contact Form Submission — ${name}`,
    wrap('New Contact Submission', `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left:4px solid #2E6B3E;margin:0;padding:12px 20px;background:rgba(46,107,62,0.06);">${message}</blockquote>
      <p style="margin-top:24px;font-size:12px;color:#999;">Submitted: ${date} · IP: ${escapeHtml(contact.ipAddress || 'N/A')}</p>
    `)
  );
};

const sendContactConfirmation = (email, name) =>
  send(email, "We've received your message — Alabira Global Farm",
    wrap('Message Received', `
      <p>Dear ${escapeHtml(name)},</p>
      <p>Thank you for contacting Alabira Global Farm. We will reply within <strong>24 hours</strong>.</p>
      <p>Warm regards,<br><strong>The Alabira Team</strong></p>
    `)
  );

const sendWelcomeNewsletter = (email, unsubscribeToken) =>
  send(email, 'Welcome to the Alabira Farm Community 🌿',
    wrap('Welcome!', `
      <p>Thank you for joining our farm community!</p>
      <p>You'll receive seasonal recipes, farm updates, and early access to new products.</p>
      <p>Warm regards,<br><strong>The Alabira Team</strong></p>
      <p style="margin-top:40px;font-size:12px;color:#999;">
        <a href="https://alabiraglobalfarm.com/api/newsletter/unsubscribe?token=${unsubscribeToken}" style="color:#999;">Unsubscribe</a>
      </p>
    `)
  );

const sendUnsubscribeConfirmation = (email) =>
  send(email, "You've been unsubscribed — Alabira Global Farm",
    wrap('Unsubscribed', `
      <p>You've been removed from our newsletter. We're sorry to see you go.</p>
      <p>You're always welcome back at <a href="https://alabiraglobalfarm.com">alabiraglobalfarm.com</a>.</p>
    `)
  );

module.exports = { sendContactNotification, sendContactConfirmation, sendWelcomeNewsletter, sendUnsubscribeConfirmation };
