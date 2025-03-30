import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Switch } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Edit, CloudUpload } from "@mui/icons-material";

const UserProfilePage = () => {
  const defaultUser = {
    avatar: "https://via.placeholder.com/150",
    name: "John Doe",
    bio: "Tech enthusiast, blogger & software engineer.",
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userProfile");
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setUser(editedUser);
    setIsModalOpen(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3, boxShadow: 3, bgcolor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Avatar src={user.avatar} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
        <Typography variant="h5" gutterBottom>{user.name}</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>{user.bio}</Typography>
        <div>
          <IconButton href={user.socialLinks.twitter} target="_blank" color="primary"><Twitter /></IconButton>
          <IconButton href={user.socialLinks.github} target="_blank" color="inherit"><GitHub /></IconButton>
          <IconButton href={user.socialLinks.linkedin} target="_blank" color="primary"><LinkedIn /></IconButton>
        </div>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsModalOpen(true)} startIcon={<Edit />}>Edit Profile</Button>
      </CardContent>
      
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body1">Dark Mode</Typography>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </CardContent>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            type="file"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
            id="avatar-upload"
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span" startIcon={<CloudUpload />}>Upload Avatar</Button>
          </label>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={editedUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Bio"
            name="bio"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={editedUser.bio}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Twitter Link"
            name="twitter"
            fullWidth
            variant="outlined"
            value={editedUser.socialLinks.twitter}
            onChange={(e) => setEditedUser({ ...editedUser, socialLinks: { ...editedUser.socialLinks, twitter: e.target.value } })}
          />
          <TextField
            margin="dense"
            label="GitHub Link"
            name="github"
            fullWidth
            variant="outlined"
            value={editedUser.socialLinks.github}
            onChange={(e) => setEditedUser({ ...editedUser, socialLinks: { ...editedUser.socialLinks, github: e.target.value } })}
          />
          <TextField
            margin="dense"
            label="LinkedIn Link"
            name="linkedin"
            fullWidth
            variant="outlined"
            value={editedUser.socialLinks.linkedin}
            onChange={(e) => setEditedUser({ ...editedUser, socialLinks: { ...editedUser.socialLinks, linkedin: e.target.value } })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={saveProfile} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default UserProfilePage;

