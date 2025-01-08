const express = require("express");
const { connectDB, sql } = require("./db"); // Import database config
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
connectDB();

// Route to fetch books from the database
app.get("/books", async (req, res) => {
  try {
    const result = await sql.query(`
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
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ message: "Error retrieving books", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
