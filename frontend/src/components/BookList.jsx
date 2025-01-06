import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

const BookList = () => {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography color="textSecondary">{book.author}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
