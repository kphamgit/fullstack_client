import logo from './logo.svg';
import Navbar from "./components/Navbar.js";
import './style.css'
import Pricing from './components/pages/Pricing.js';
import About from './components/pages/About.js';
import Home from './components/pages/Home.js';

import { Component } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  /*
  console.log(window.location)
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Home />
      break
    case "/pricing":
      component = <Pricing />
      break;
    case "/about":
      component = <About />
      break;
    default:
      break;
  }
  */
 /*
  return (
    <>
      <Navbar />
      <div className='container'>
        {component}
      </div>
    </>
  );
  */
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/pricing" element={<Pricing />} />
          <Route path = "/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
