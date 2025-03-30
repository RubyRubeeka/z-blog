import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage"; 
import UserProfilePage from "./pages/UserProfilePage";
import BlogManagement from "./pages/BlogManagement";
import PasswordResetPage from "./pages/PasswordResetPage";
import AuthProvider from "./AuthContext";
import NavBar from "./components/NavBar";
import NotificationSystem from "./components/NotificationSystem"; 
import Footer from "./components/Footer";

function AppContent() {
  const { darkMode } = useDarkMode();

  // Create light and dark themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const [allPosts, setAllPosts] = useState([
    { id: 1, title: "Video 1", description: "Sample Description 1", category: "Tech", tags: ["React"], youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", slug: "video-1" },
    { id: 2, title: "Video 2", description: "Sample Description 2", category: "Fitness", tags: ["Yoga"], youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", slug: "video-2" },
    { id: 3, title: "Video 3", description: "Sample Description 3", category: "Programming", tags: ["JavaScript"], youtubeLink: "https://www.youtube.com/embed/dQw4w9WgXcQ", slug: "video-3" },
  ]);

  // Notification state to store notifications
  const [notifications, setNotifications] = useState([]);

  // Example of adding a notification
  const triggerNotification = () => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { message: "New comment on your post!", type: "info" },
    ]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <AuthProvider>
        <NavBar />
        <NotificationSystem notifications={notifications} setNotifications={setNotifications} />
        <Routes>
          <Route path="/" element={<HomePage allPosts={allPosts} />} />
          <Route path="/admin" element={<AdminDashboard allPosts={allPosts} setAllPosts={setAllPosts} />} />
          <Route path="/blogmg" element={<BlogManagement allPosts={allPosts} setAllPosts={setAllPosts} />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserProfilePage allPosts={allPosts} />} />
        </Routes>
        <Footer /> 
      </AuthProvider> 
    </ThemeProvider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
