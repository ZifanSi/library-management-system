const express = require('express');
const app = express();
const booksRoute = require('./routes/booksRoute'); // Import the route file

// Use the /books route
app.use('/books', booksRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
