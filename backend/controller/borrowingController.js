const { connectDB } = require("../db/db");

// Get borrowing information for a specific user
const getBorrowingInfo = async (req, res) => {
  const { account } = req.query; // Accept 'account' as a query parameter

  if (!account) {
    return res.status(400).json({ message: "Account is required" });
  }

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("account", account)
      .query(`
        SELECT 
          h.hid,
          h.book_name,
          h.begin_time,
          h.end_time,
          h.status,
          b.author,
          b.press,
          b.type_name
        FROM t_history h
        LEFT JOIN t_book b ON h.bid = b.bid
        WHERE h.account = @account
      `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching borrowing information:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const { bid } = req.params; // Book ID from the request parameter
  const { uid, name, account } = req.body; // User details from the request body

  try {
    const pool = await connectDB();

    // Check if the book is available
    const checkBookResult = await pool
      .request()
      .input("bid", bid)
      .query(`SELECT num, book_name FROM t_book WHERE bid = @bid`);
    const book = checkBookResult.recordset[0];

    if (!book || book.num <= 0) {
      return res.status(400).json({ message: "Book not available" });
    }

    // Decrease book availability
    await pool
      .request()
      .input("bid", bid)
      .query(`
        UPDATE t_book
        SET num = num - 1
        WHERE bid = @bid AND num > 0;
      `);

    // Add borrowing record to t_history
    await pool
      .request()
      .input("uid", uid)
      .input("name", name)
      .input("account", account)
      .input("bid", bid)
      .input("book_name", book.book_name)
      .input("begin_time", new Date())
      .input("status", 1) // 1 = Borrowed
      .query(`
        INSERT INTO t_history (uid, name, account, bid, book_name, begin_time, status)
        VALUES (@uid, @name, @account, @bid, @book_name, @begin_time, @status);
      `);

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (err) {
    console.error("Error during borrow operation:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getBorrowingInfo, borrowBook };
