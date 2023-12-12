import React, {useState, useEffect, useContext} from 'react'
//import { useRoutes } from 'react-router-dom'
import { Link, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
//import axios from 'axios'
import './Navbar.css'
//import Dropdown from './Dropdown.js'
//import Subcategory from '../Category/Subcategory.js'
import Category from '../Category/Category.js'
import Logout from '../Login/Logout.js'
import { Context } from './App.js'
import Subcategory from '../Category/Subcategory.js'
//import {Subcategory} from '../Category/Subcategory.js';



export default function Navbar({categories}) {
    const [click, setClick] = useState(false)
    //const [dropdown, setDropdown] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
   
      //const [post, setPost] = useState([]);
      //loggedinname, setLoggedinname
      const { token, setToken, loggedinname, setLoggedinname } = useContext(Context);

      /*
      useEffect(() => {
        axios.get("http://localhost:5000/api/categories").then((response) => {
          //alert(token)
          //setToken(response.data)
          setPost(response.data);
        });
      }, []);
      */
      //console.log("XXXXXXXXXXXX in Navbar post = ",post)
      
    
      const user = sessionStorage.getItem('user')
    return (
        <>
        <nav className='navbar'>
            <div>{user}</div>
            <Link to='/' className='navabar-logo'>
               HOME
            </Link>
            <Logout />
            <div className='menu-icon' onClick={handleClick}>
                <FontAwesomeIcon icon={click ? faTimes : faBars } />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {categories.map(cat => 
             <li key={cat.name}>
              <Category
              className='nav-links'
              name={cat.name} sub_categories={cat.sub_categories} >
              {cat.name}</Category>
              </li>
      )}
        </ul>
        </nav>
        </>
    )
}

 