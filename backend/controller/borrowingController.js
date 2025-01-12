const { connectDB } = require("../db/db");

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

module.exports = { getBorrowingInfo };
