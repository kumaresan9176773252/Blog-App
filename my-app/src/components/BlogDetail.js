import React, { useEffect, useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };
  const fatchDetails = async () => {
    const res = await axios.get(`https://blog-app-7ygu.onrender.com/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fatchDetails().then((data) => {
      setBlog(data.blog)
      setInputs({ title: data.blog.title, description: data.blog.description, imageURL: data.blog.image })
    })
  }, [id]);

  const sendRequest = async () => {
    const res = await axios.put(`https://blog-app-7ygu.onrender.com/api/blog/update/${id}`, {
      title: inputs.title,
      description: inputs.description,
      imageURL: inputs.image
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then((data) => console.log(data))
    .then(()=>navigate("/myBlogs"))
  }
  return (
    <div>
      {inputs &&
        <form onSubmit={handleSubmit}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            border={3}
            borderColor={"linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"}
            borderRadius={10}
            boxShadow={"10px 10px 10px #ccc"}
            padding={3}
            margin={"auto"}
            marginTop={3}
            width={"80%"} >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color={"grey"}
              variant='h2'
              textAlign={"center"}
            >
              Post Your Blog</Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField name='title' onChange={handleChange} value={inputs.title} margin='auto' variant='outlined' />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined' />
            <InputLabel sx={labelStyles}>ImageUrl</InputLabel>
            <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='auto' variant='outlined' />
            <Button
              type='submit'
              color='warning'
              variant='contained'
              sx={{ mt: 2, borderRadius: 4 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      }

    </div>
  )
}

export default BlogDetail
