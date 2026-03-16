const Billing = require('../models/Billing');

exports.getBilling = (req, res) => {
  Billing.findAll((err, bills) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, data: bills });
  });
};

exports.createBilling = (req, res) => {
  const billingData = req.body;
  Billing.create(billingData, (err, bill) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ success: true, data: bill });
  });
};

