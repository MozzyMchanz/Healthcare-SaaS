const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173' // Vite frontend
}));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Healthcare SaaS Backend API running!' });
});

// Placeholder routes for healthcare features
const patientRoutes = require('./routes/patients');
app.use('/api/patients', patientRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const doctorRoutes = require('./routes/doctors');
app.use('/api/doctors', doctorRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

const medicalRecordRoutes = require('./routes/medicalRecords');
app.use('/api/medicalRecords', medicalRecordRoutes);

const billingRoutes = require('./routes/billing');
app.use('/api/billing', billingRoutes);

// Test PG connection on startup
const pool = require('./config/db');
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('PostgreSQL connected successfully');
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

