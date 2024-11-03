import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    console.log("Navigating to blog with ID:", id); // This should log the ID
    navigate(`/myBlogs/${id}`); // Use the correct ID for navigation
  };

  const deleteReq=async()=>{
    const res=await axios.delete(`http://localhost:3000/api/blogs/${id}`).catch(err=>console.log(err))
    const data=await res.data
    return data
  }
  const handleDelete = () => {
    deleteReq().then(()=>navigate('/')).then(()=>navigate('/myblogs'))
  
  };

  return (
    <Card sx={{ width: "40%", margin: 'auto', mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
      boxShadow: "10px 10px 20px #be1dfd"
    }}}>
      {isUser && (
        <Box display={'flex'}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }} color='warning'>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color='error'>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName && userName[0]}
          </Avatar>
        }
        title={title}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="blog image"
      />
      <CardContent>
        <hr style={{ border: '0', height: '2px', background: 'linear-gradient(to right, #ff416c, #ff4b2b)' }}  />
        <br />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <b>{userName}</b>: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blog;
