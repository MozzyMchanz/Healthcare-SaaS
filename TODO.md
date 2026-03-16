const pool = require('../config/db');

const Doctor = {
  findAll: (callback) => {
    pool.query('SELECT * FROM doctors ORDER BY created_at DESC', (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows);
    });
  },

  create: (doctorData, callback) => {
    const { name, specialty, phone, availability } = doctorData;
    const query = `
      INSERT INTO doctors (name, specialty, phone, availability) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const values = [name, specialty, phone, availability];
    pool.query(query, values, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows[0]);
    });
  }
};

module.exports = Doctor;

