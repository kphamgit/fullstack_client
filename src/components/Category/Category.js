import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import '../Navbar/Navbar.css'

export default function Category ({name, sub_categories}) {
    //const {name} = props
    const [dropdown, setDropdown] = useState(false);

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

    return (
        <li className='nav-item'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <span className='nav-links'>{name}</span>
        {dropdown && <Dropdown sub_categories = {sub_categories}/>}
        </li>
        //<Link to='/'>{name}</Link>
    )
}