const pool = require('./config/db');

const seedData = async () => {
  try {
    // Patients
    await pool.query(`INSERT INTO patients (name, dob, phone, email, address) VALUES 
      ('John Doe', '1980-01-01', '123456789', 'john@example.com', '123 Main St')
      ON CONFLICT DO NOTHING`);

    // Doctors
    await pool.query(`INSERT INTO doctors (name, specialty, phone, availability) VALUES 
      ('Dr. Smith', 'Cardiology', '987654321', 'Mon-Fri 9-5')
      ON CONFLICT DO NOTHING`);

    // Users (admin)
    const bcrypt = require('bcryptjs');
    const hash = bcrypt.hashSync('pass123', 10);
    await pool.query(`INSERT INTO users (username, password_hash, role) VALUES 
      ('admin', '${hash}', 'admin')
      ON CONFLICT DO NOTHING`);

    console.log('Seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    pool.end();
  }
};

seedData();

