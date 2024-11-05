
// import { Route, Routes } from 'react-router-dom'
// import './App.css'
// import Header from './components/Header'
// import Auth from './components/Auth'
// import Blogs from './components/Blogs'
// import UserBlogs from './components/UserBlogs'
// import BlogDetail from './components/BlogDetail'
// import AddBlog from './components/AddBlog'
// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'
// import { authActions } from './store'




// function App() {
//   const dispatch=useDispatch()
// const isLoggedIN=useSelector(state=>state.isLoggedIN)
// console.log(isLoggedIN);

// useEffect(()=>{
//   if(localStorage.getItem('userId')){
//     dispatch(authActions.login())
//   }
// },[dispatch])

//   return (
//     <>
//     <Header/>
//     <Routes>
//      { !isLoggedIN?  <Route path='/auth' element={<Auth/>}></Route>
//      :
//       <>
//         <Route path='/blogs' element={<Blogs/>}></Route>
//         <Route path='/myBlogs' element={<UserBlogs/>}></Route>
//         <Route path='/myBlogs/:id' element={<BlogDetail />} />
//         <Route path='/blogs/add' element={<AddBlog/>}></Route>
//       </>
//      }
//     </Routes>
     
//     </>
//   )
// }

// export default App

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { authActions } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const dispatch = useDispatch();
  const isLoggedIN = useSelector((state) => state.isLoggedIN);

  // Theme mode state
  const [mode, setMode] = useState(() => localStorage.getItem("theme") || "light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  // Toggle theme mode and persist choice in localStorage
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // Check if user is logged in when the component mounts
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header toggleTheme={toggleTheme} mode={mode} /> {/* Pass toggle function and current mode */}
      <Routes>
        <Route path="/" element={<Auth/>}/>
        {!isLoggedIN ? (
          <Route path="/auth" element={<Auth />} />
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
