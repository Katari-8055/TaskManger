import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage.jsx'
import AboutPage from './pages/About.jsx'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<LandingPage/>} />
      <Route path='/about' element={<AboutPage/>}/>
      
    </Routes>
     <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
