const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user) return res.status(400).json({ error: 'User exists' });

    User.create({ username, password, role }, (err, newUser) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ success: true, token, user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findByUsername(username, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    bcrypt.compare(password, user.password_hash, (err, match) => {
      if (err || !match) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token, user: { id: user.id, username: user.username, role: user.role } });
    });
  });
};

