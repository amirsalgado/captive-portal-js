// db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

console.log('DB Config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '(empty)',
  database: process.env.DB_NAME,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// Export the pool with promise support to use async/await for database queries
export default pool.promise();
