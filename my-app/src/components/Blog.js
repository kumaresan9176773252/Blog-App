import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
//import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
//import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { useStyles } from './utils';

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
 // const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`/myBlog/${id}`);
  }
  const deleteRequest = async () => {
    const res = await axios.delete(`https://blog-app-7ygu.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleDelete = (e) => {
    deleteRequest().then(() => navigate("/")).then(() => navigate("/blogs"))
  }
  console.log(title, isUser);
  return (
    <div>
      <Card sx={{
        width: "40%", margin: "auto", mt: 2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover": {
          boxShadow: "10px 10px 20px #ccc"
        }
      }}>
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ ml: "auto" }} >
           
            </IconButton>
            <IconButton onClick={handleDelete} >
            
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar  sx={{ bgcolor: 'red' }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }

          title={title}
          subheader="JUNE 24, 2024"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="MY blog image"
        />
        <CardContent>
          <hr />
          <br />
          <Typography  variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>

      </Card>
    </div>
  )
}

export default Blog
