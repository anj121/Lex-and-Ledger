import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index) => (event) => {
    const value = event.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsOtpValid(newOtp.every((digit) => digit.length === 1));

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOtpValid) {
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
            localStorage.setItem("isLoggedIn",true)
    }
  };

  return (
    <>
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
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ borderRadius: 4 }}>
            <Grid container spacing={0}>
              {/* Left Side - Information Section */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  background: "#0b0e2a",
                  color: "white",
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Verify OTP
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Enter the 4-digit OTP sent to your registered email or phone.
                </Typography>
              </Grid>

              {/* Right Side - OTP Form */}
              <Grid
                item
                xs={12}
                md={7}
                sx={{ padding: 4, textAlign: "center" }}
              >
                {showSuccess ? (
                  <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}}>
                    <CheckCircle
                      style={{
                        textAlign: "center",
                        fontSize: 100,
                        color: "#4caf50",
                        marginBottom: 12,
                      }}
                    />
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#4caf50" }}
                    >
                      OTP Verified Successfully!
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Redirecting to dashboard...
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="#333"
                      gutterBottom
                    >
                      Enter OTP
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={1}>
                      {otp.map((digit, index) => (
                        <TextField
                          key={index}
                          variant="outlined"
                          inputProps={{
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: "24px" },
                          }}
                          sx={{ width: "50px" }}
                          value={digit}
                          onChange={handleChange(index)}
                          onKeyDown={handleKeyDown(index)}
                          inputRef={(el) => (inputRefs.current[index] = el)}
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 3, bgcolor: "#FF8C00" }}
                      disabled={!isOtpValid}
                      onClick={handleSubmit}
                    >
                      Verify OTP
                    </Button>
                    <Typography
                      variant="body2"
                      sx={{ mt: 2, cursor: "pointer", color: "#FF8C00" }}
                    >
                      Resend OTP
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default OTPVerification;
