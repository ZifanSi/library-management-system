const { connectDB } = require("../db/db");

const loginUser = async (req, res) => {
  const { account, password } = req.body;

  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("account", account)
      .input("password", password)
      .query(`
        SELECT uid, name, role, account FROM t_user 
        WHERE account = @account AND password = @password
      `); // Include the 'account' field in the SELECT query

    if (result.recordset.length > 0) {
      const user = result.recordset[0];
      res.status(200).json({ message: "Login successful", user }); // Send 'account' in the response
    } else {
      res.status(401).json({ message: "Invalid account or password" });
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginUser };
