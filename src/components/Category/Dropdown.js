import React, { useState } from 'react';
import menu_items from './MenuItems.js';
import './Dropdown.css';
import { Link } from 'react-router-dom';

export default function Dropdown({sub_categories}) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  /*
  const menu_items = [
    {
      title: 'First Grammar',
      path: '/subcategory',
      cName: 'dropdown-link'
    },
    {
      title: 'Next Grammar',
      path: '/subcategory',
      cName: 'dropdown-link'
    },
  ];
  */
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {sub_categories.map((item, index) => {
            const ilink = '/api/subcategories/' + item.id
          return (
            
            <li key={index}>
              <Link
                className="dropdown-link"
                to= {ilink}
                onClick={() => setClick(false)}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}