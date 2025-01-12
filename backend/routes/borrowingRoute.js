const express = require("express");
const router = express.Router();
const { getBorrowingInfo } = require("../controller/borrowingController");

router.get("/", getBorrowingInfo); // No authentication middleware

module.exports = router;
