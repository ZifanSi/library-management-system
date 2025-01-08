const { connectDB } = require('../db/db'); 

const getBooks = async (req, res) => {
  try {
    // Ensure the pool is connected
    const pool = await connectDB();  // Get the pool from the database connection
    const result = await pool.request().query(`
      SELECT TOP (1000)
        [bid],
        [book_name],
        [author],
        [num],
        [press],
        [type_name],
        [tid],
        [times]
      FROM [dbo].[t_book]
    `);

    res.status(200).json(result.recordset); // Send the query result as JSON
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};

module.exports = { getBooks };
