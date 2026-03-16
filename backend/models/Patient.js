const pool = require('../config/db');

const Patient = {
  // Get all patients
  findAll: (callback) => {
    pool.query('SELECT * FROM patients ORDER BY created_at DESC', (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows);
    });
  },

  // Create new patient
  create: (patientData, callback) => {
    const { name, dob, phone, email, address } = patientData;
    const query = `
      INSERT INTO patients (name, dob, phone, email, address) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [name, dob, phone, email, address];
    pool.query(query, values, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows[0]);
    });
  }
};

module.exports = Patient;

