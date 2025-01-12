import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, CssBaseline, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import BookSearchPage from "./BookSearchPage";
import BorrowingInformationPage from "./BorrowingInformationPage";

const drawerWidth = 240;

const MainPage = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user details

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Welcome, {user?.name || "User"}!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/main/book-search">
            <ListItemText primary="Book Search" />
          </ListItem>
          <ListItem button component={Link} to="/main/borrowing-information">
            <ListItemText primary="Borrowing Information" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Routes>
          <Route path="book-search" element={<BookSearchPage />} />
          <Route path="borrowing-information" element={<BorrowingInformationPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainPage;
