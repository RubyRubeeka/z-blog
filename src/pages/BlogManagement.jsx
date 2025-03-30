// Code for the BlogManagement page crud 
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Card, CardContent, Select, MenuItem } from '@mui/material';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"; 




const BlogManagement = ({ allPosts, setAllPosts, allUsers, setAllUsers }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: editIndex === null ? allPosts.length + 1 : allPosts[editIndex].id,
      title,
      description,
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      imageURL,
      videoURL,
      slug: title.toLowerCase().replace(/ /g, '-'),
      approved: false,
      authorId: 1 // Replace with dynamic author ID
    };

    if (editIndex === null) {
      setAllPosts([...allPosts, newPost]);
    } else {
      const updatedPosts = [...allPosts];
      updatedPosts[editIndex] = newPost;
      setAllPosts(updatedPosts);
      setEditIndex(null);
    }

    setTitle('');
    setDescription('');
    setContent('');
    setCategory('General');
    setTags('');
    setImageURL('');
    setVideoURL('');
  };

  const handleEdit = (index) => {
    const post = allPosts[index];
    setTitle(post.title);
    setDescription(post.description);
    setContent(post.content);
    setCategory(post.category);
    setTags(post.tags.join(', '));
    setImageURL(post.imageURL);
    setVideoURL(post.videoURL);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPosts = allPosts.filter((_, i) => i !== index);
    setAllPosts(updatedPosts);
  };

  return (
    <Container>
      <Typography variant="h4" marginY={4}>Blog Post Management</Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />

        <Typography variant="h6" marginTop={2}>Content</Typography>
        <ReactQuill theme="snow" value={content} onChange={setContent} />

        <TextField label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} fullWidth margin="normal" />
        <TextField label="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} fullWidth margin="normal" />
        <TextField label="Video URL (YouTube)" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} fullWidth margin="normal" />

        <Select value={category} onChange={(e) => setCategory(e.target.value)} fullWidth margin="normal">
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Tech">Tech</MenuItem>
          <MenuItem value="Fitness">Fitness</MenuItem>
          <MenuItem value="Programming">Programming</MenuItem>
        </Select>

        <Button variant="contained" type="submit" fullWidth style={{ marginTop: '20px' }}>
          {editIndex === null ? 'Create Post' : 'Update Post'}
        </Button>
      </form>

      <Typography variant="h5" marginY={4}>Existing Posts</Typography>
      <Grid container spacing={2}>
        {allPosts.map((post, index) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Button onClick={() => handleEdit(index)}>Edit</Button>
                <Button onClick={() => handleDelete(index)}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogManagement;
