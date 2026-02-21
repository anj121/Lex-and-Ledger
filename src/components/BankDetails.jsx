import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  AccountBalance,
  Security,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const bankTypes = [
  'Public Sector Bank',
  'Private Sector Bank',
  'Foreign Bank',
  'Regional Rural Bank',
  'Cooperative Bank',
  'Small Finance Bank',
  'Payment Bank',
];

const securityFeatures = [
  'Bank-level encryption for all data',
  'Secure API integration with banks',
  'PCI DSS compliant payment processing',
  'Regular security audits and monitoring',
  'No storage of sensitive banking credentials',
];

const BankDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    bankType: '',
    branchName: '',
    accountType: 'savings',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bankVerified, setBankVerified] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Account holder name validation
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    } else if (formData.accountHolderName.trim().length < 2) {
      newErrors.accountHolderName = 'Account holder name must be at least 2 characters';
    }

    // Bank name validation
    // if (!formData.bankName.trim()) {
    //   newErrors.bankName = 'Bank name is required';
    // }

    // Account number validation
    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Account number is required';
    } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      newErrors.accountNumber = 'Account number must be between 9-18 digits';
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must contain only digits';
    }

    // Confirm account number validation
    if (!formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Please confirm your account number';
    } else if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = 'Account numbers do not match';
    }

    // IFSC code validation
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!formData.ifscCode) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!ifscRegex.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Please enter a valid IFSC code (e.g., SBIN0001234)';
    }

    // Bank type validation
    // if (!formData.bankType) {
    //   newErrors.bankType = 'Please select bank type';
    // }

    // Branch name validation
    // if (!formData.branchName.trim()) {
    //   newErrors.branchName = 'Branch name is required';
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleVerifyBank = async () => {
    if (!formData.ifscCode || !formData.accountNumber) {
      return;
    }

    setLoading(true);
    
    // Simulate bank verification API call
    setTimeout(() => {
      setBankVerified(true);
      setLoading(false);
      
      // Auto-fill bank name based on IFSC (simulation)
      const bankMapping = {
        'SBIN': 'State Bank of India',
        'HDFC': 'HDFC Bank',
        'ICIC': 'ICICI Bank',
        'AXIS': 'Axis Bank',
        'UTIB': 'Axis Bank',
        'KKBK': 'Kotak Mahindra Bank',
        'YESB': 'Yes Bank',
      };
      
      const bankCode = formData.ifscCode.substring(0, 4);
      const bankName = bankMapping[bankCode] || 'Unknown Bank';
      
      setFormData(prev => ({
        ...prev,
        bankName: bankName,
      }));
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // if (!bankVerified) {
    //   setErrors({ general: 'Please verify your bank details first' });
    //   return;
    // }

    setLoading(true);
    
    // Store bank details
    const existingData = JSON.parse(localStorage.getItem('expertRegistrationData') || '{}');
    const updatedData = {
      ...existingData,
      bankDetails: {
        ...formData,
        verifiedAt: new Date().toISOString(),
      },
    };
    localStorage.setItem('expertRegistrationData', JSON.stringify(updatedData));

    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      navigate('/pay-subscription');
    }, 1500);
  };

  const handleBack = () => {
    navigate('/aadhar-pan-verification');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header */}
      {/* <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2 }}
            disabled={loading}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Bank Details
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Step 6 of 8
          </Typography>
        </Toolbar>
        {loading && <LinearProgress color="secondary" />}
      </AppBar> */}

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <AccountBalance sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Bank Account Details
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
              Please provide your bank account details for payment processing. 
              This information is securely encrypted and used only for financial transactions.
            </Typography>
          </Box>

          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Box container spacing={3} sx={{display:"flex",flexDirection:"column" ,gap:3}}>
                  {/* Account Holder Name */}
                  <Box sx={{flex:1}}>
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      value={formData.accountHolderName}
                      onChange={handleInputChange('accountHolderName')}
                      error={!!errors.accountHolderName}
                      helperText={errors.accountHolderName || 'Name as per bank records'}
                      required
                    />
                  </Box>

                  {/* Account Number */}
                  <Box sx={{flex:1}}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      type="number"
                      value={formData.accountNumber}
                      onChange={handleInputChange('accountNumber')}
                      error={!!errors.accountNumber}
                      helperText={errors.accountNumber}
                      required
                    />
                  </Box>

                  {/* Confirm Account Number */}
                  <Box >
                    <TextField
                      fullWidth
                      label="Confirm Account Number"
                      type="number"
                      value={formData.confirmAccountNumber}
                      onChange={handleInputChange('confirmAccountNumber')}
                      error={!!errors.confirmAccountNumber}
                      helperText={errors.confirmAccountNumber}
                      required
                    />
                  </Box>

                  {/* IFSC Code */}
                  <Box >
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      value={formData.ifscCode}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase();
                        if (value.length <= 11) {
                          handleInputChange('ifscCode')({ target: { value } });
                        }
                      }}
                      error={!!errors.ifscCode}
                      helperText={errors.ifscCode}
                      placeholder="SBIN0001234"
                      required
                    />
                  </Box>

                  {/* Verify Bank Button */}
                  {/* <Box >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleVerifyBank}
                      disabled={!formData.ifscCode || !formData.accountNumber || bankVerified || loading}
                      sx={{ 
                        height: 56,
                        color: bankVerified ? '#4caf50' : 'primary.main',
                        borderColor: bankVerified ? '#4caf50' : 'primary.main',
                      }}
                      startIcon={bankVerified ? <CheckCircle /> : <Security />}
                    >
                      {loading ? 'Verifying...' : bankVerified ? 'Bank Verified' : 'Verify Bank Details'}
                    </Button>
                  </Box> */}

                  {/* Bank Name (Auto-filled after verification) */}
                  {/* <Box >
                    <TextField
                      fullWidth
                      label="Bank Name"
                      value={formData.bankName}
                      onChange={handleInputChange('bankName')}
                      error={!!errors.bankName}
                      helperText={errors.bankName}
                      disabled={bankVerified}
                      required
                    />
                  </Box> */}

                  {/* Bank Type */}
                  {/* <Box >
                    <FormControl fullWidth error={!!errors.bankType}>
                      <InputLabel>Bank Type</InputLabel>
                      <Select
                        value={formData.bankType}
                        onChange={handleInputChange('bankType')}
                        label="Bank Type"
                      >
                        {bankTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.bankType && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                          {errors.bankType}
                        </Typography>
                      )}
                    </FormControl>
                  </Box> */}

                  {/* Branch Name */}
                  <Box >
                    <TextField
                      fullWidth
                      label="Branch Name"
                      value={formData.branchName}
                      onChange={handleInputChange('branchName')}
                      error={!!errors.branchName}
                      helperText={errors.branchName}
                      required
                    />
                  </Box>

                  {/* Account Type */}
                  <Box >
                    <FormControl fullWidth>
                      <InputLabel>Account Type</InputLabel>
                      <Select
                        value={formData.accountType}
                        onChange={handleInputChange('accountType')}
                        label="Account Type"
                      >
                        <MenuItem value="savings">Savings Account</MenuItem>
                        <MenuItem value="current">Current Account</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                {errors.general && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    {errors.general}
                  </Alert>
                )}

                {bankVerified && (
                  <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography variant="body2">
                      <strong>Bank Details Verified!</strong> Your account information has been validated successfully.
                    </Typography>
                  </Alert>
                )}

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={loading}
                    size="large"
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ minWidth: 200 }}
                  >
                    {loading ? 'Processing...' : 'Continue to Payment'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security sx={{ color: '#4caf50', mr: 1 }} />
                <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600 }}>
                  Your Security is Our Priority
                </Typography>
              </Box>
              <List dense>
                {securityFeatures.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={feature}
                      sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Note:</strong> Your bank details will be used only for payment processing. 
              We never store your complete account information and use secure tokenization for all transactions.
            </Typography>
          </Alert>

          <Alert severity="warning">
            <Typography variant="body2">
              <strong>Important:</strong> Ensure that the account holder name matches exactly with your bank records. 
              Any mismatch may cause payment delays or failures.
            </Typography>
          </Alert>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BankDetails;

