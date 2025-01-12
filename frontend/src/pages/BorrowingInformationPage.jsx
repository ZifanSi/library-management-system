import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axios from "axios";

const BorrowingInformationPage = ({ userAccount }) => {
  const [borrowingData, setBorrowingData] = useState([]);

  useEffect(() => {
    const fetchBorrowingData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/borrowing", {
          params: { account: userAccount }, // Pass user account as query parameter
        });
        setBorrowingData(response.data);
      } catch (error) {
        console.error("Error fetching borrowing information:", error.message);
      }
    };

    fetchBorrowingData();
  }, [userAccount]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Borrowing Information
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Borrow ID</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Borrow Date</TableCell>
            <TableCell>Return Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borrowingData.map((record) => (
            <TableRow key={record.hid}>
              <TableCell>{record.hid}</TableCell>
              <TableCell>{record.book_name}</TableCell>
              <TableCell>{record.author || "Unknown"}</TableCell>
              <TableCell>{record.press || "Unknown"}</TableCell>
              <TableCell>{record.type_name || "Unknown"}</TableCell>
              <TableCell>{record.begin_time}</TableCell>
              <TableCell>{record.end_time || "Not Returned"}</TableCell>
              <TableCell>{record.status === 1 ? "Borrowed" : "Returned"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BorrowingInformationPage;
