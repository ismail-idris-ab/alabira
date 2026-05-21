const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signAccess  = (id, role) => jwt.sign({ id, role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
const signRefresh = (id)       => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.verifyPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials.' });

    const accessToken  = signAccess(admin._id, admin.role);
    const refreshToken = signRefresh(admin._id);

    admin.refreshTokens.push(refreshToken);
    admin.lastLogin = new Date();
    await admin.save();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
  } catch (err) { next(err); }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token.' });
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin || !admin.refreshTokens.includes(token))
      return res.status(401).json({ message: 'Invalid refresh token.' });
    res.json({ accessToken: signAccess(admin._id, admin.role) });
  } catch (err) { next(err); }
};

const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      await Admin.findByIdAndUpdate(decoded.id, { $pull: { refreshTokens: token } });
    }
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out.' });
  } catch {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out.' });
  }
};

module.exports = { login, refresh, logout };
