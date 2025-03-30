import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Switch, Box 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDarkMode } from "../context/DarkModeContext";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation links
  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Write Blog", path: "/blogmg" },
    { text: "Signup", path: "/signup" },
    { text: "Login", path: "/login" },
    { text: "Profile", path: "/profile" },
  ];

  // For Mobile 
  const drawer = (
    <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
      <List sx={{ width: 250 }}>
        {navLinks.map((link) => (
          <ListItem button key={link.text} component={Link} to={link.path} onClick={handleDrawerToggle}>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: darkMode ? "black" : "primary.main" }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Blog Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Zaapee Blog
          </Typography>

          {/* Dark Mode Toggle */}
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} sx={{ mr: 2 }} />

          {/* For Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navLinks.map((link) => (
              <Button key={link.text} color="inherit" component={Link} to={link.path} sx={{ ml: 2 }}>
                {link.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar for Mobile */}
      {drawer}
    </>
  );
};

export default NavBar;
