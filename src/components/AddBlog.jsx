import { Box,Typography,InputLabel, TextField,Button} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../baseURL';



const AddBlog = () => {
  const navigate=useNavigate()
  const [inputs,setInputs]=useState({
    title:"",description:"",imageURL:""
   })

   const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
   }

   const sendRequest=async()=>{
    const res=await axios.post(`${BASE_URL}/api/blogs/add`,{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err))
    const data=await res.data
    return data
   }

   const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate('/blogs'))
   }


  return (
    <div>
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
          <InputLabel sx={{mb:1,mt:2,fontSize:'25px',fontWeight:'bold'}}>IMAGE URL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined'/>
          <Button sx={{mt:2,borderRadius:5}} variant='contained' style={{width:'250px',marginLeft:'25%'}} type='submit'>SUBMIT</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog