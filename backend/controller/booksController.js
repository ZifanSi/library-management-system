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

const borrowBook = async (req, res) => {
  const { bid } = req.params; // Book ID passed as a parameter

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("bid", bid)
      .query(`
        UPDATE t_book
        SET num = num - 1
        WHERE bid = @bid AND num > 0; -- Ensure num is greater than 0
      `);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Book borrowed successfully" });
    } else {
      res.status(400).json({ message: "Book not available" });
    }
  } catch (err) {
    console.error("Error during borrow operation:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getBooks, borrowBook };
