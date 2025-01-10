import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import axios from "axios";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate(); // React Router navigation hook

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        account,
        password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        alert(`Welcome ${response.data.user.name}!`);
        // Redirect to main page after successful login
        navigate("/main");
      }
    } catch (err) {
      setSuccess(false);
      setError("Invalid account or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Login successful!</Alert>}
      <TextField
        label="Account"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        sx={{ marginBottom: 2, maxWidth: 400 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
