const Patient = require('../models/Patient');

exports.getPatients = (req, res) => {
  Patient.findAll((err, patients) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: patients });
  });
};

exports.createPatient = (req, res) => {
  const patientData = req.body;
  Patient.create(patientData, (err, patient) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, data: patient });
  });
};

