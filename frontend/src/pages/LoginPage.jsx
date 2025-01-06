import React from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";

const LoginPage = () => {
  const handleLogin = () => {
    // Add login logic (e.g., API call)
    window.location.href = "/dashboard";
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Library Management System
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
