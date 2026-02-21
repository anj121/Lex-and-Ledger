import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "@/config/api";

const Signup = () => {
  const navigate = useNavigate();

  const [userType] = useState("user");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    let newErrors = {};

    if (!values.firstName) newErrors.firstName = "First name is required";
    if (!values.lastName) newErrors.lastName = "Last name is required";

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(values.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    validate(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(formData)) return;

    try {
      setLoading(true);
      setApiError("");

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.mobile,
        username: formData.email.split("@")[0], // auto username
        password: "Temp@12345", // temp password (OTP ke baad change)
        role: userType,
      };

      await axios.post(
        `${API_CONFIG.BASE_URL}/auth/register`,
        payload
      );

      navigate("/otp", {
        state: { email: formData.email },
      });
    } catch (error) {
      setApiError(
        error?.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
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
        <Paper elevation={6} sx={{ borderRadius: 4 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                color: "white",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                background: "linear-gradient(to right, #2563eb, #4f46e5)",
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome!
              </Typography>
              <Typography>
                Join our community and explore new opportunities.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} sx={{ padding: 4 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Create Account
              </Typography>

              {apiError && (
                <Typography color="error" mb={2}>
                  {apiError}
                </Typography>
              )}

              <Box display="grid" gap={2}>
                <TextField
                  label="First Name"
                  name="firstName"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Mobile Number"
                  name="mobile"
                  fullWidth
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, bgcolor: "#FF8C00" }}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Sign Up"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
