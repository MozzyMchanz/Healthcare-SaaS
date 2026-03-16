const pool = require('../config/db');

const MedicalRecord = {
  findAll: (callback) => {
    const query = `
      SELECT mr.*, p.name as patient_name, d.name as doctor_name 
      FROM medical_records mr 
      JOIN patients p ON mr.patient_id = p.id 
      JOIN doctors d ON mr.doctor_id = d.id 
      ORDER BY mr.date DESC
    `;
    pool.query(query, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows);
    });
  },

  create: (recordData, callback) => {
    const { patient_id, doctor_id, diagnosis, prescription, notes } = recordData;
    const query = `
      INSERT INTO medical_records (patient_id, doctor_id, diagnosis, prescription, notes, date) 
      VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) 
      RETURNING *
    `;
    const values = [patient_id, doctor_id, diagnosis, prescription, notes];
    pool.query(query, values, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, res.rows[0]);
    });
  }
};

module.exports = MedicalRecord;

