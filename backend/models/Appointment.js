const pool = require('../config/db');

const Appointment = {
  findAll: (callback) => {
    const query = `
      SELECT a.*, p.name as patient_name, d.name as doctor_name 
      FROM appointments a 
      JOIN patients p ON a.patient_id = p.id 
      JOIN doctors d ON a.doctor_id = d.id 
      ORDER BY a.date_time DESC
    `;
    pool.query(query, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows);
    });
  },

  create: (appointmentData, callback) => {
    const { patient_id, doctor_id, date_time, status, notes } = appointmentData;
    const query = `
      INSERT INTO appointments (patient_id, doctor_id, date_time, status, notes) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const values = [patient_id, doctor_id, date_time, status || 'scheduled', notes || ''];
    pool.query(query, values, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows[0]);
    });
  }
};

module.exports = Appointment;

