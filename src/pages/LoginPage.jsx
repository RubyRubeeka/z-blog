// LoginPage Component - User Login & OAuth Integration
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You can replace this with a real API call to check the login credentials and user verification status.
    if (email === 'admin@example.com' && password === 'admin') {
      // Simulating a scenario where the admin is verified.
      setIsVerified(true);
      
      if (!isVerified) {
        // If not verified, redirect to a verification page
        setErrorMessage('Your account is not verified. Please check your email for the verification link.');
        navigate('/verify');
      } else {
        alert('Logged in as Admin');
        navigate('/admin');
      }
    } else if (email === 'user@example.com' && password === 'user') {
      // Simulating an unverified user
      setIsVerified(false); // This user needs to verify their account.
      
      if (!isVerified) {
        setErrorMessage('Your account is not verified. Please check your email for the verification link.');
        navigate('/verify'); // Redirect to the verification page.
      } else {
        alert('Logged in Successfully');
        navigate('/');
      }
    } else {
      setErrorMessage('Invalid login credentials.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" textAlign="center" marginY={4}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Email" 
          type="email" 
          fullWidth 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>Login</Button>
        <Button variant="text" fullWidth sx={{ marginTop: 1 }} onClick={() => navigate('/reset-password')}>Forgot Password?</Button>
        <Box marginTop={3} textAlign="center">
          <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>Login with Google</Button>
          <Button variant="contained" color="secondary">Login with GitHub</Button>
        </Box>
        {errorMessage && (
          <Typography color="error" variant="body2" textAlign="center" marginTop={2}>
            {errorMessage}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default LoginPage;
