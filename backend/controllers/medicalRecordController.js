const MedicalRecord = require('../models/MedicalRecord');

exports.getMedicalRecords = (req, res) => {
  MedicalRecord.findAll((err, records) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: records });
  });
};

exports.createMedicalRecord = (req, res) => {
  const recordData = req.body;
  MedicalRecord.create(recordData, (err, record) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, data: record });
  });
};

