const Doctor = require('../models/Doctor');

exports.getDoctors = (req, res) => {
  Doctor.findAll((err, doctors) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: doctors });
  });
};

exports.createDoctor = (req, res) => {
  const doctorData = req.body;
  Doctor.create(doctorData, (err, doctor) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, data: doctor });
  });
};

