const sql = require('mssql');
const dbConfig = require('../config/dbConfig.json'); // Import the JSON file

let pool;

const connectDB = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig); // Use configuration from JSON file
      console.log('Connected to SQL Server successfully!');
    }
    return pool; // Return the pool so it can be used in queries
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw new Error('Database connection failed');
  }
};

module.exports = { connectDB, sql };
