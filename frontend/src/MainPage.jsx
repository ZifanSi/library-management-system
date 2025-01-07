import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

// Import Sub Pages
import BookSearchPage from "./pages/BookSearchPage";
import BorrowingInformationPage from "./pages/BorrowingInformationPage";
import BorrowingHistoryPage from "./pages/BorrowingHistoryPage";
import PopularBooksPage from "./pages/PopularBooksPage";
import BestReadersPage from "./pages/BestReadersPage";

const drawerWidth = 240;

const MainPage = () => {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Library Management System
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
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button component={Link} to="/book-search">
                <ListItemText primary="Book Search" />
              </ListItem>
              <ListItem button component={Link} to="/borrowing-information">
                <ListItemText primary="Borrowing Information" />
              </ListItem>
              <ListItem button component={Link} to="/borrowing-history">
                <ListItemText primary="Borrowing History" />
              </ListItem>
              <ListItem button component={Link} to="/popular-books">
                <ListItemText primary="Popular Books" />
              </ListItem>
              <ListItem button component={Link} to="/best-readers">
                <ListItemText primary="Best Readers" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, ml: drawerWidth }}
        >
          <Toolbar />
          <Routes>
            <Route path="/book-search" element={<BookSearchPage />} />
            <Route path="/borrowing-information" element={<BorrowingInformationPage />} />
            <Route path="/borrowing-history" element={<BorrowingHistoryPage />} />
            <Route path="/popular-books" element={<PopularBooksPage />} />
            <Route path="/best-readers" element={<BestReadersPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default MainPage;
