import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ backgroundColor: "#444", color: "white", py: 4, mt: 5 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          
          {/* Left Section - About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Zaapee Blog</Typography>
            <Typography variant="body2">
              Zaapee Blog is a feature-rich blogging platform for sharing ideas, tutorials, and experiences.
            </Typography>
          </Grid>

          {/* Middle Section - Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Link href="/" color="inherit" sx={{ display: "block", mt: 1 }}>Home</Link>
            <Link href="/profile" color="inherit" sx={{ display: "block", mt: 1 }}>Profile</Link>
          </Grid>

          {/* Right Section - Social Media */}
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6">Follow Us</Typography>
            <IconButton href="https://facebook.com" target="_blank" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="https://github.com" target="_blank" color="inherit">
              <GitHub />
            </IconButton>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Zaapee Blog. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
