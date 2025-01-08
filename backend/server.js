const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const booksRoute = require('./routes/booksRoute');

// Enable CORS for all routes
app.use(cors());

// Use the /books route
app.use('/books', booksRoute);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
