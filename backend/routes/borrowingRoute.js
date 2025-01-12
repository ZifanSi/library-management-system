const express = require("express");
const router = express.Router();
const { getBorrowingInfo, borrowBook } = require("../controller/borrowingController");

// Route to fetch borrowing information
router.get("/", getBorrowingInfo);

// Route to borrow a book
router.put("/borrow/:bid", borrowBook);

module.exports = router;
