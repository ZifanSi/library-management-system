import React, { useState } from "react";
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

const sampleBooks = [
  { id: 1, type: "History", title: "World History", author: "John Smith", press: "Oxford Press", number: 5 },
  { id: 2, type: "Programming", title: "Learn JavaScript", author: "Jane Doe", press: "Tech Press", number: 3 },
];

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState(sampleBooks);

  // Handle search functionality
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredBooks = sampleBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.type.toLowerCase().includes(query)
    );

    setBooks(filteredBooks);
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
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.type}</TableCell>
                <TableCell>{book.title || "Unknown"}</TableCell>
                <TableCell>{book.author || "Unknown"}</TableCell>
                <TableCell>{book.press || "Unknown"}</TableCell>
                <TableCell>{book.number}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBorrow(book.id)}
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
