const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
findByEmail: (email, callback) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
      if (err) return callback(err, null);
      callback(null, res.rows[0]);
    });
  },

create: (userData, callback) => {
    const { email, password, role } = userData;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err, null);
      pool.query(
        'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role',
        [email, hash, role],
        (err, res) => {
          if (err) return callback(err, null);
          callback(null, res.rows[0]);
        }
      );
    });
  }
};

module.exports = User;

