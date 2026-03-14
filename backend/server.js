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
app.get('/api/patients', (req, res) => {
  res.json({ patients: [] }); // TODO: Connect DB
});

app.post('/api/patients', (req, res) => {
  res.status(201).json({ message: 'Patient created' });
});

// DB connect placeholder
/*
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
*/

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

