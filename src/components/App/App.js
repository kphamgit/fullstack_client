import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'
import Login from '../Login/Login'
import useToken from './useToken';
import Navbar from './Navbar';
//import Router from './routes/Router';
import Home from '../Home/Home';
import axios from 'axios';
import Subcategory from '../Category/Subcategory';

//function App() {
  export default function App() {
  const { token, setToken } = useToken();
  //const [data, setData] = useState([]);
  function logout(){
    setToken("")   
  }

    if(!token) {
        return <Login setToken={setToken} />
      }
  
    return (
      <>
        <div>
        <p onClick={()=> logout()} style={{color:"blue", cursor:'pointer'}} >Log Out</p>
        
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/subcategories/1" element={<Subcategory id = "1" />} />
            <Route path="/api/subcategories/2" element={<Subcategory id = "2" />} />
            <Route path="/api/subcategories/3" element={<Subcategory id = "3" />} />
            <Route path="/api/subcategories/4" element={<Subcategory id = "4" />} />
          </Routes>
          </BrowserRouter>
        </div>
      </>
    )
  }