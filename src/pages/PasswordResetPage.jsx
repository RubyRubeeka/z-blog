// PasswordResetPage Component - Password Reset Functionality
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Password reset link sent to your email.');
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" marginY={4}>Password Reset</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Enter your email" 
          type="email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>Send Reset Link</Button>
      </form>
    </Container>
  );
};

export default PasswordResetPage;



