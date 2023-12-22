import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'


/*
In a single-page React Application, 
routing refers to the process of navigating 
between different pages without triggering a 
full page reload. The application initially 
loads a single HTML page. Then, it dynamically 
renders different components based on user interaction.
*/
export default function App() {
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about" element={<About />} />
      
      <Route element={<PrivateRoute />} >
        <Route path="/profile" element={<Profile />} />
      </Route>
      

    </Routes>
  </BrowserRouter>
}
