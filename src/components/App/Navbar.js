import React, {useState, useEffect} from 'react'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './Navbar.css'
import Dropdown from './Dropdown.js'
import Subcategory from '../Category/Subcategory.js'
import Category from '../Category/Category.js'

export default function Navbar() {
    const [click, setClick] = useState(false)
    //const [dropdown, setDropdown] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
    /*
    const onMouseEnter = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(true);
        }
      };
    
      const onMouseLeave = () => {
        if (window.innerWidth < 960) {
          setDropdown(false);
        } else {
          setDropdown(false);
        }
      };
      */
      const [post, setPost] = useState([]);

      useEffect(() => {
        axios.get("http://localhost:5000/categories").then((response) => {
          setPost(response.data);
        });
      }, []);

      console.log("XXXXXXXXXXXX in Navbar post = ",post)
    /*
      if (!post) return null;
    
      return (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      );
        */
      const sub_categories = [{id: '1',     name: 'sub1'}, {id: "2", name: 'sub2'} ]
   
      const my_cats = [{
        "name": "Reading",
        "sub_categories": [
            {
                "id": "1",
                "name": "sub1"
            },
            {
                "id": "2",
                "name": "sub2"
            }
        ]},
        {
          "name": "Grammar",
          "sub_categories": [
              {
                  "id": "1",
                  "name": "sub3"
              },
              {
                  "id": "2",
                  "name": "sub4"
              }
          ]}
      ]

      my_cats.forEach(cat => {
        console.log("BBBBBBBBB"+cat.name)
      })
    
    return (
        <>
        <nav className='navbar'>
            <Link to='/' className='navabar-logo'>
                EPIC
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <FontAwesomeIcon icon={click ? faTimes : faBars } />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {my_cats.map(cat => 
              <Category
              className='nav-links'
              name={cat.name} sub_categories={cat.sub_categories} >
              {cat.name}</Category>
             
              
      )}
          
        
        </ul>
        </nav>
        </>
    )
}

 