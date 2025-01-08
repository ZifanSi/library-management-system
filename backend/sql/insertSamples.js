const { connectDB, sql } = require("../db/db");
const books = require("../books.json");

const insertSamples = async () => {
  try {
    const pool = await connectDB();
    console.log("Connected to SQL Server successfully!");

    // Drop the table if it exists
    await pool.request().query(`
      IF OBJECT_ID('dbo.t_book', 'U') IS NOT NULL
      DROP TABLE dbo.t_book;
    `);

    // Recreate the table
    await pool.request().query(`
      CREATE TABLE dbo.t_book (
        bid INT PRIMARY KEY,
        book_name VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        num INT,
        press VARCHAR(255),
        type_name VARCHAR(255),
        tid INT,
        times INT
      );
    `);

    console.log("Table recreated successfully!");

    // Insert books into the table
    for (const book of books) {
      await pool
        .request()
        .input("bid", sql.Int, book.bid)
        .input("book_name", sql.VarChar, book.book_name)
        .input("author", sql.VarChar, book.author)
        .input("num", sql.Int, book.num)
        .input("press", sql.VarChar, book.press)
        .input("type_name", sql.VarChar, book.type_name)
        .input("tid", sql.Int, book.tid)
        .input("times", sql.Int, book.times)
        .query(`
          INSERT INTO dbo.t_book (bid, book_name, author, num, press, type_name, tid, times)
          VALUES (@bid, @book_name, @author, @num, @press, @type_name, @tid, @times);
        `);
    }

    console.log("Sample records inserted successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    sql.close();
  }
};

// Run the script
insertSamples();
