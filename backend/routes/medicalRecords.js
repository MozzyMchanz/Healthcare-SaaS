const express = require('express');
const router = express.Router();
const medicalRecordController = require('../controllers/medicalRecordController');

router.get('/', medicalRecordController.getMedicalRecords);
router.post('/', medicalRecordController.createMedicalRecord);

module.exports = router;

