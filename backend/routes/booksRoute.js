const express = require('express');
const router = express.Router();
const { getBooks, borrowBook } = require('../controller/booksController'); // Import borrowBook

router.get('/', getBooks);
router.put("/borrow/:bid", borrowBook); // Borrow route

module.exports = router;
