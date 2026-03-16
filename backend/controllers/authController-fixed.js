const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user) return res.status(400).json({ error: 'User exists' });

    User.create({ email, password, role }, (err, newUser) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1h' });
      res.status(201).json({ success: true, token, user: { id: newUser.id, email: newUser.email, role: newUser.role } });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    bcrypt.compare(password, user.password, (err, match) => {
      if (err || !match) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '1h' });
      res.json({ success: true, token, user: { id: user.id, email: user.email, role: user.role } });
    });
  });
};

