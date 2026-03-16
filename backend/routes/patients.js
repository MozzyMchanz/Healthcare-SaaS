const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// GET /api/patients - Get all patients
router.get('/', patientController.getPatients);

// POST /api/patients - Create new patient
router.post('/', patientController.createPatient);

module.exports = router;

