import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    if (email === 'user@example.com' && password === 'password') {
      setUser({ email, verified: true });
      navigate('/');
    } else {
      alert('Invalid credentials!');
    }
  };

  const signUp = (email, password) => {
    alert('Account created successfully! Please verify your account via the link sent to your email.');
    navigate('/verify');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  const resetPassword = (email) => {
    alert(`Password reset link has been sent to ${email}. Please check your email.`);
    navigate('/login');
  };

  const verifyAccount = (code) => {
    if (code === '123456') { 
      alert('Account successfully verified!');
      navigate('/login');
    } else {
      alert('Invalid verification code!');
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, signUp, resetPassword, verifyAccount }}>
      
      {children}
    </AuthContext.Provider>
    
    
  );
};

export default AuthProvider;


