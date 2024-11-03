
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase'; // Import Firebase auth and provider
import { signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: '', email: '', password: ''
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = 'login') => {
    try {
      const res = await axios.post(`http://localhost:3000/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error("Error in sendRequest:", err);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest('signup')
        .then((data) => {
          if (data) localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'));
    } else {
      sendRequest()
        .then((data) => {
          if (data) localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'));
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Store user in the backend or perform other actions with `token` as needed
      dispatch(authActions.login());
      localStorage.setItem("userId", user.uid);
      navigate('/blogs');
    } catch (error) {
      console.error("Error with Google sign-in:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          boxShadow={'10px 10px 20px #ccc'}
          padding={3}
          margin={'auto'}
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant='h4' padding={3} textAlign={'center'}>
            {isSignUp ? "SIGNUP" : "LOGIN"}
          </Typography>
          {isSignUp && <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='User Name' margin='normal' />}
          <TextField name='email' onChange={handleChange} value={inputs.email} type='email' placeholder='Email' margin='normal' />
          <TextField name='password' onChange={handleChange} value={inputs.password} type='password' placeholder='Password' margin='normal' />
          <Button type='submit' variant='contained' sx={{ borderRadius: 3, marginTop: 3 }} color='success'>Submit</Button>
          <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ borderRadius: 3, marginTop: 3 }}>
            Change to {isSignUp ? "LOGIN" : "SIGNUP"}
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            variant="outlined"
            sx={{ borderRadius: 3, marginTop: 3, background: "#fff", color: "#000" }}
          >
            Sign in with Google
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;




