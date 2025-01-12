const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const bodyParser = require("body-parser"); // Import body-parser for parsing JSON requests
const booksRoute = require("./routes/booksRoute"); // Import books route
const userRoute = require("./routes/userRoute"); // Import user route
const borrowingRoute = require("./routes/borrowingRoute"); // Import borrowing route

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Routes
app.use("/books", booksRoute); // Books route
app.use("/user", userRoute); // User route
app.use("/borrowing", borrowingRoute); // Borrowing route

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
