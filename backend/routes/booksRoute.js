// File: /routes/booksRoute.js
const express = require('express');
const router = express.Router();
const booksController = require('../controller/booksController'); // Correct import path

router.get('/', booksController.getBooks);

module.exports = router;
