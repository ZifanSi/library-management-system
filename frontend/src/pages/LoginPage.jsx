import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Login attempt with:", { account, password }); // Log input details

    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        account,
        password,
      });

      console.log("Login response:", response.data); // Log the response from the backend

      if (response.status === 200) {
        const user = response.data.user;
        console.log("User data received:", user); // Log the user details

        localStorage.setItem("user", JSON.stringify(user)); // Save user info in Local Storage
        console.log("User stored in Local Storage:", JSON.parse(localStorage.getItem("user"))); // Verify Local Storage

        navigate("/main"); // Navigate to the main page
      }
    } catch (err) {
      console.error("Login error:", err.message); // Log any error message
      setError("Invalid account or password");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Account"
        variant="outlined"
        fullWidth
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2, maxWidth: 400 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ maxWidth: 400 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
