const pool = require('./config/db');

const seedData = async () => {
  try {
    // Patients
await pool.query(`INSERT INTO patients (name, phone) VALUES 
      ('John Doe', '123456789') ON CONFLICT (id) DO NOTHING`);

    // Doctors
await pool.query(`INSERT INTO doctors (name, phone) VALUES 
      ('Dr. Smith', '987654321') ON CONFLICT (id) DO NOTHING`);

    // Users (admin)
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('pass123', 10);
    await pool.query(`INSERT INTO users (email, password, role) VALUES 
      ('admin@example.com', '${hash}', 'admin')
      ON CONFLICT DO NOTHING`);

    console.log('Seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    pool.end();
  }
};

seedData();

