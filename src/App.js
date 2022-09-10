import React from 'react'
import Login from './Login'
import Task from './Task'
import './Login.css'
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Link to='/login' className="text-decoration-none ms-2 text-dark">Login</Link>

      <Link to='/register' className="text-decoration-none ms-2 text-dark">Register</Link>
      <Routes>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/register' element={<Task/>}></Route>
      </Routes>
    </Router>
  )
}

export default App