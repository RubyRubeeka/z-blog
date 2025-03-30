import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });

  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    // Name validation
    if (!name) {
      formErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      formErrors.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation
    if (!password) {
      formErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm Password validation
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate sending verification email
      alert('User Registered Successfully. A verification code has been sent to your email!');
      setIsEmailSent(true);
    }
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();
    if (verificationCode === '123456') { // Simulate correct code
      alert('Email Verified Successfully');
      navigate('/login'); // Redirect to login after successful verification
    } else {
      setErrors({ ...errors, verificationCode: 'Incorrect Verification Code' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" marginY={4}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Name" 
          fullWidth 
          margin="normal" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          error={!!errors.name} 
          helperText={errors.name}
        />
        <TextField 
          label="Email" 
          type="email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          error={!!errors.email} 
          helperText={errors.email}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          error={!!errors.password} 
          helperText={errors.password}
        />
        <TextField 
          label="Confirm Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          error={!!errors.confirmPassword} 
          helperText={errors.confirmPassword}
        />
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ marginTop: 2 }}
        >
          Sign Up
        </Button>
      </form>

      {isEmailSent && (
        <Box marginTop={4}>
          <Typography variant="h6" textAlign="center">Verification</Typography>
          <form onSubmit={handleVerifyEmail}>
            <TextField 
              label="Verification Code" 
              fullWidth 
              margin="normal" 
              value={verificationCode} 
              onChange={(e) => setVerificationCode(e.target.value)} 
              error={!!errors.verificationCode} 
              helperText={errors.verificationCode}
            />
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth 
              sx={{ marginTop: 2 }}
            >
              Verify Email
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
};

export default SignUpPage;
