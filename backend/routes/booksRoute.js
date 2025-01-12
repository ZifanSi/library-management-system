const express = require('express');
const router = express.Router();
const { getBooks } = require('../controller/booksController');

router.get('/', getBooks);

module.exports = router;
