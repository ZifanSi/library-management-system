const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

// SQL Server configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Disable encryption for local development
    enableArithAbort: true,
  },
  port: parseInt(process.env.DB_PORT, 10),
};

// Function to connect to the database
const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, sql };
