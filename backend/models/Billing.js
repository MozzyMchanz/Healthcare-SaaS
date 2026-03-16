const pool = require('../config/db');

const Billing = {
  findAll: (callback) => {
    const query = `
      SELECT b.*, p.name as patient_name, a.date_time as appointment_date 
      FROM billing b 
      JOIN patients p ON b.patient_id = p.id 
      LEFT JOIN appointments a ON b.appointment_id = a.id 
      ORDER BY b.created_at DESC
    `;
    pool.query(query, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows);
    });
  },

  create: (billingData, callback) => {
    const { patient_id, appointment_id, services, amount, status } = billingData;
    const query = `
      INSERT INTO billing (patient_id, appointment_id, services, amount, status) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [patient_id, appointment_id, services, amount, status || 'unpaid'];
    pool.query(query, values, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows[0]);
    });
  }
};

module.exports = Billing;

