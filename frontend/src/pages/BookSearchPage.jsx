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
import axios from "axios";

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user details

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, []);

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

  const handleBorrow = async (bid) => {
    try {
      const response = await axios.put(`http://localhost:5000/books/borrow/${bid}`, {
        uid: user.uid,
        name: user.name,
        account: user.account,
      });

      if (response.status === 200) {
        alert("Book borrowed successfully!");
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.bid === bid ? { ...book, num: book.num - 1 } : book
          )
        );
        setFilteredBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.bid === bid ? { ...book, num: book.num - 1 } : book
          )
        );
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error borrowing book");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book Search
      </Typography>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 3 }}
      />
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
                    disabled={book.num <= 0}
                  >
                    {book.num > 0 ? "Borrow" : "Not Available"}
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
