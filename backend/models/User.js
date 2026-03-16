const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  findByUsername: (username, callback) => {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
      if (err) return callback(err, null);
      callback(null, res.rows[0]);
    });
  },

  create: (userData, callback) => {
    const { username, password, role } = userData;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err, null);
      pool.query(
        'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role',
        [username, hash, role],
        (err, res) => {
          if (err) return callback(err, null);
          callback(null, res.rows[0]);
        }
      );
    });
  }
};

module.exports = User;

