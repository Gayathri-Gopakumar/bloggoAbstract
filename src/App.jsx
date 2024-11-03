
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Auth from './components/Auth'
import Blogs from './components/Blogs'
import UserBlogs from './components/UserBlogs'
import BlogDetail from './components/BlogDetail'
import AddBlog from './components/AddBlog'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store'




function App() {
  const dispatch=useDispatch()
const isLoggedIN=useSelector(state=>state.isLoggedIN)
console.log(isLoggedIN);

useEffect(()=>{
  if(localStorage.getItem('userId')){
    dispatch(authActions.login())
  }
},[dispatch])

  return (
    <>
    <Header/>
    <Routes>
     { !isLoggedIN?  <Route path='/auth' element={<Auth/>}></Route>
     :
      <>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/myBlogs' element={<UserBlogs/>}></Route>
        <Route path='/myBlogs/:id' element={<BlogDetail />} />
        <Route path='/blogs/add' element={<AddBlog/>}></Route>
      </>
     }
    </Routes>
     
    </>
  )
}

export default App
