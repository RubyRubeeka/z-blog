// HomePage Component - Displaying Featured & Related Blog Posts with Search & Pagination
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, Card, CardContent, Button, Pagination, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ allPosts }) => {  
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const postsPerPage = 6;
  const totalPosts = 30;

  useEffect(() => {
    // Generate dummy posts if not enough
    if (allPosts.length < totalPosts) {
      const newPosts = [
        { id: 1, title: 'React Tutorial for Beginners', description: 'Learn React from scratch with this comprehensive guide.', category: 'Tech', tags: ['React', 'JavaScript'], youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', slug: 'react-tutorial' },
        { id: 2, title: 'Yoga Tips for Better Health', description: 'Explore the best yoga techniques to improve your health and well-being.', category: 'Fitness', tags: ['Yoga', 'Health'], youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', slug: 'yoga-tips' },
        { id: 3, title: 'JavaScript Best Practices', description: 'Enhance your coding skills with these JavaScript best practices.', category: 'Programming', tags: ['JavaScript', 'Coding'], youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ', slug: 'javascript-best-practices' }
      ];
      allPosts.push(...newPosts);

      while (allPosts.length < totalPosts) {
        allPosts.push({
          id: allPosts.length + 1,
          title: `Video ${allPosts.length + 1}`,
          description: `Sample Description ${allPosts.length + 1}`,
          category: 'General',
          tags: ['Tag1', 'Tag2'],
          video: '',
          youtubeLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          slug: `video-${allPosts.length + 1}`
        });
      }
    }

    // Filter and paginate posts
    const filteredPosts = allPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setDisplayedPosts(filteredPosts.slice(startIndex, endIndex));
  }, [allPosts, searchQuery, currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleReadMore = (slug) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" textAlign="center" marginY={4}>
        Zaapee Blog
      </Typography>

      <TextField 
        label="Search posts" 
        variant="outlined" 
        fullWidth 
        margin="normal" 
        value={searchQuery} 
        onChange={handleSearchChange}
        sx={{ marginBottom: 4 }}
      />

      <Grid container spacing={4} marginTop={2}>
        {displayedPosts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              {post.youtubeLink && (
                <iframe
                  width="100%"
                  height="220"
                  src={post.youtubeLink}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography>{post.description}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  style={{ marginTop: '10px' }}
                  onClick={() => handleReadMore(post.slug)}
                  
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default HomePage;


