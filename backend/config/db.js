 const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "db.kmciitkwywtjmzoomqgh.supabase.co",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "#D_U_K_E@8%",
  port: parseInt(process.env.DB_PORT) || 5432,
});
module.exports = pool;
