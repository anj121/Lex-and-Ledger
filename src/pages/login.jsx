import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      console.log("Mobile Number Submitted:", mobile);
      toast.success('OTP Sent to your mobile number!');

      // alert("OTP Sent to your mobile number!");
      navigate("/otp");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #F4F4F4, #D9D9D9)",

        padding: 2,
      }}
    >
      <Container className="!max-w-[767px]">
        <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Grid container spacing={0}>
            {/* Left Side - Information Section */}
            <Grid
              item
              xs={12}
              md={6}
              className="bg-gradient-to-r from-blue-600 to-indigo-700"
              sx={{
                // background: "#0b0e2a",
                color: "white",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Login
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enter your mobile number to receive an OTP for login.
              </Typography>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} md={6} sx={{ padding: 4, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold" color="#333" gutterBottom>
                Enter Mobile Number
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={handleChange}
                inputProps={{ maxLength: 10, style: { textAlign: "center", fontSize: "18px" } }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: "#333333", padding: "10px", fontSize: "16px" }}
                disabled={mobile.length !== 10}
                onClick={handleSubmit}
              >
                Send OTP
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link href="/signup" underline="hover" sx={{ fontWeight: "bold", color: "#333333" }}>
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
