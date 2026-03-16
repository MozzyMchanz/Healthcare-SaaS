const Appointment = require('../models/Appointment');

exports.getAppointments = (req, res) => {
  Appointment.findAll((err, appointments) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: appointments });
  });
};

exports.createAppointment = (req, res) => {
  const appointmentData = req.body;
  Appointment.create(appointmentData, (err, appointment) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, data: appointment });
  });
};

