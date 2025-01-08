import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios"; // Axios for making API requests

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [books, setBooks] = useState([]); // State for all books from the backend
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

  // Fetch books from the backend on component load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books"); // Backend API URL
        setBooks(response.data); // Set the books state
        setFilteredBooks(response.data); // Initialize filteredBooks with all books
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

  // Handle search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = books.filter(
      (book) =>
        book.book_name.toLowerCase().includes(query) ||
        (book.author && book.author.toLowerCase().includes(query)) ||
        (book.type_name && book.type_name.toLowerCase().includes(query))
    );

    setFilteredBooks(filtered);
  };

  // Handle Borrow Button Click
  const handleBorrow = (id) => {
    alert(`You clicked Borrow for book ID: ${id}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Book Search
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 3 }}
      />

      {/* Book List */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Book Type</TableCell>
              <TableCell>Book</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Press</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.bid}>
                <TableCell>{book.bid}</TableCell>
                <TableCell>{book.type_name || "Unknown"}</TableCell>
                <TableCell>{book.book_name || "Unknown"}</TableCell>
                <TableCell>{book.author || "Unknown"}</TableCell>
                <TableCell>{book.press || "Unknown"}</TableCell>
                <TableCell>{book.num}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBorrow(book.bid)}
                  >
                    Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookSearchPage;
