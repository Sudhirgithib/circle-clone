const { Pool } = require('pg');
require('dotenv').config();

console.log("🔥 DATABASE CONFIG FILE LOADED 🔥");

const pool = new Pool({
  user: 'contentuser',
  host: '127.0.0.1',
  database: 'contenthub',
  password: 'yourpassword',
  port: 5432,
  ssl: false
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
