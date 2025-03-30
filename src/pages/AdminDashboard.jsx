import React, { useState } from "react";
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Card, CardContent } from "@mui/material";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [allPosts, setAllPosts] = useState([
    { id: 1, title: "Post 1", approved: true, views: 150 },
    { id: 2, title: "Post 2", approved: false, views: 90 },
  ]);
  const [allUsers, setAllUsers] = useState([
    { id: 1, name: "User 1", role: "admin", banned: true },
    { id: 2, name: "User 2", role: "user", banned: true },
  ]);
  const [analyticsData, setAnalyticsData] = useState({
    totalPosts: allPosts.length,
    totalUsers: allUsers.length,
    totalApprovedPosts: allPosts.filter((post) => post.approved).length,
    totalPendingPosts: allPosts.filter((post) => !post.approved).length,
    totalViews: allPosts.reduce((sum, post) => sum + post.views, 0),
  });

  // User Management (Ban/Unban & Assign Roles)
  const handleUserBanToggle = (userId) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === userId) {
        const updatedUser = { ...user, banned: !user.banned };
        return updatedUser;
      }
      return user;
    });
    setAllUsers(updatedUsers);
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === userId) {
        const updatedUser = { ...user, role: newRole };
        return updatedUser;
      }
      return user;
    });
    setAllUsers(updatedUsers);
  };

  // Blog Moderation (Approve/Reject Posts)
  const handleApprovePost = (index) => {
    const updatedPosts = allPosts.map((post, i) =>
      i === index ? { ...post, approved: true } : post
    );
    setAllPosts(updatedPosts);
  };

  const handleRejectPost = (index) => {
    const updatedPosts = allPosts.filter((_, i) => i !== index);
    setAllPosts(updatedPosts);
  };

  return (
    <Container>
      <Typography variant="h4" marginY={4}>
        Admin Dashboard
      </Typography>

      {/* Tab Navigation */}
      <div style={{ marginBottom: "20px" }}>
        <Button
          variant={activeTab === "posts" ? "contained" : "outlined"}
          onClick={() => setActiveTab("posts")}
        >
          Blog Moderation
        </Button>
        <Button
          variant={activeTab === "users" ? "contained" : "outlined"}
          onClick={() => setActiveTab("users")}
        >
          User Management
        </Button>
        <Button
          variant={activeTab === "analytics" ? "contained" : "outlined"}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </Button>
      </div>

      {/* Blog Moderation Section */}
      {activeTab === "posts" && (
        <div>
          <Typography variant="h5">Blog Moderation</Typography>
          {allPosts.map((post, index) => (
            <Card key={post.id} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApprovePost(index)}
                  disabled={post.approved}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRejectPost(index)}
                >
                  Reject
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* User Management Section */}
      {activeTab === "users" && (
        <div>
          <Typography variant="h5">User Management</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Banned</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{user.banned ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleUserBanToggle(user.id)}
                      >
                        {user.banned ? "Unban" : "Ban"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === "analytics" && (
        <div>
          <Typography variant="h5">Analytics</Typography>
          <Typography>Total Posts: {analyticsData.totalPosts}</Typography>
          <Typography>Total Users: {analyticsData.totalUsers}</Typography>
          <Typography>Approved Posts: {analyticsData.totalApprovedPosts}</Typography>
          <Typography>Pending Posts: {analyticsData.totalPendingPosts}</Typography>
          <Typography>Total Views: {analyticsData.totalViews}</Typography>
        </div>
      )}
    </Container>
  );
};

export default AdminDashboard;


