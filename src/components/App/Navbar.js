import React, {useState, useEffect, useContext} from 'react'
//import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './Navbar.css'
//import Dropdown from './Dropdown.js'
//import Subcategory from '../Category/Subcategory.js'
import Category from '../Category/Category.js'
import Logout from '../Login/Logout.js'
import { Context } from './App.js'

export default function Navbar() {
    const [click, setClick] = useState(false)
    //const [dropdown, setDropdown] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
   
      const [post, setPost] = useState([]);

      const { token, setToken } = useContext(Context);

      useEffect(() => {
        axios.get("http://localhost:5000/api/categories").then((response) => {
          //alert(token)
          //setToken(response.data)
          setPost(response.data);
        });
      }, []);

      //console.log("XXXXXXXXXXXX in Navbar post = ",post)
    
    return (
        <>
        <nav className='navbar'>
            <Link to='/' className='navabar-logo'>
                EPIC
            </Link>
            <Logout />
            <div className='menu-icon' onClick={handleClick}>
                <FontAwesomeIcon icon={click ? faTimes : faBars } />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {post.map(cat => 
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

 