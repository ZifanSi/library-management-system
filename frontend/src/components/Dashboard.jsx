import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import BookList from "../components/BookList";

const DashboardPage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Library Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ marginTop: 2 }}>
          Available Books
        </Typography>
        <BookList />
      </Container>
    </>
  );
};

export default DashboardPage;
