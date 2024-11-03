import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box,Typography,InputLabel, TextField,Button} from '@mui/material'


const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const [inputs,setInputs]=useState({   })
  const navigate=useNavigate()
  const { id } = useParams(); // Correctly destructure id from useParams

  console.log("BlogDetail received id from useParams:", id);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/blogs/${id}`);
      const data = res.data;
      return data; 
    } catch (err) {
      console.log("Error fetching blog details:", err);
      return null; // Return null on error
    }
  };

  useEffect(() => {
    fetchDetails().then(data => {
      if (data) {
        setBlog(data.blog); // Set the blog data if it exists
        setInputs({title:data.blog.title,description:data.blog.description})
      }
    });
  }, [id]);

  const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:3000/api/blogs/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err))
    const data=await res.data
    return data
  }

  console.log(blog); // This should show the blog details once fetched
 

   const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
   }
   const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate('/myBlogs'))
    
   }


  return (
   <>
    {inputs && 
      <form style={{marginTop:'1%'}} onSubmit={handleSubmit}> 
          <Box 
        border={3} 
        borderColor="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(190,29,253,1) 50%, rgba(252,176,69,1) 100%)" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3} 
        margin="auto" 
        display="flex" 
        flexDirection="column" 
        width="60%"
      >          <Typography fontWeight={'bold'} padding={3} color='grey' variant='h4' textAlign={'center'}>POST NEW BLOG</Typography>
          <InputLabel sx={{mb:1,mt:2,fontSize:'25px',fontWeight:'bold'}}>TITLE</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'/>
          <InputLabel sx={{mb:1,mt:2,fontSize:'25px',fontWeight:'bold'}}>DESCRIPTION</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'/>
          {/* <InputLabel sx={{mb:1,mt:2,fontSize:'25px',fontWeight:'bold'}}>IMAGE URL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined'/> */}
          <Button onClick={handleSubmit} sx={{mt:2,borderRadius:5}} variant='contained' style={{width:'250px',marginLeft:'25%'}} type='submit'>SUBMIT</Button>
        </Box>
      </form>
    }
   </>
  );
};

export default BlogDetail;

