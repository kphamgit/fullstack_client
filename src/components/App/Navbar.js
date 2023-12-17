import React, {useState } from 'react'
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
//import { Context } from './App.js'
//import Subcategory from '../Category/Subcategory.js'
import { useDispatch, useSelector } from 'react-redux'
import { turn_on , turn_off} from '../../redux/athome.js'
//import {Subcategory} from '../Category/Subcategory.js';
//import styled from 'styled-components'
//import { useLocation } from 'react-router-dom'

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white'
};

export default function Navbar({categories}) {
    const [click, setClick] = useState(false)
    const athome = useSelector((state) => state.athomeflag.value)
    const dispatch = useDispatch()
    const handleClick = () => setClick(!click)
    //const closeMobileMenu = () => setClick(false);
   
      const user = sessionStorage.getItem('user')
    return (
        <>
        <nav className='navbar'>
        <div>&nbsp;{user}</div>
            {!athome &&
            <Link to='/' style={linkStyle} onClick={ () => dispatch(turn_on()) } >
               HOME
            </Link>
    
            }
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
      <li className='nav-item'><Logout /></li>
        </ul>
        </nav>
        </>
    )
}

 