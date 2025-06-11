import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import AddRecipe from './components/AddRecipe'
import Home from './components/Home'
import FetchRecipeById from './components/FetchRecipeById'
import Saved from './components/Saved'
import Profile from './components/Profile'
import Detail from './components/Detail'



function App () {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add' element={<AddRecipe />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/:id' element={<Detail />} />
          {/* <Route path='' element={<FetchRecipeById />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
