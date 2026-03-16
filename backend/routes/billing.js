const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.get('/', billingController.getBilling);
router.post('/', billingController.createBilling);

module.exports = router;

