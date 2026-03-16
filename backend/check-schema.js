const pool = require('./config/db');

const tables = ['patients', 'doctors', 'users', 'appointments', 'medical_records', 'billing'];

tables.forEach(table => {
  pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`, [table], (err, res) => {
    if (err) {
      console.log(`Error ${table}:`, err.message);
    } else {
      console.log(`\n=== ${table.toUpperCase()} ===`);
      res.rows.forEach(row => console.log(`${row.column_name}: ${row.data_type}`));
    }
  });
});

pool.end();
