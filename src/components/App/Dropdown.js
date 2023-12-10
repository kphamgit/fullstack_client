import React, { useState, useContext} from 'react';
//import menu_items from './MenuItems.js';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import Subcategory from '../Category/Subcategory';
import { Context } from './App';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default function Dropdown({sub_categories}) {
  const [click, setClick] = useState(false);

  //const { showchat, setShowchat } = useContext(Context);
  const [subcatselected, setSubcatselected] = useState('')

  const handleClick = () => { 
      setClick(!click) 
      //console.log(" show chat"+showchat)
      //setShowchat(false)
      //console.log("show chat "+showchat)
      console.log("in handleClick Dropdown")
  };
  
 // console.log(
  //   "QQQQQQQQQQQQ in Dropdown sub_categories array = ",sub_categories
 // )
  /*
  const menu_items = [
    {
      title: 'First Grammar',
      path: '/api/subcategories/1',
      cName: 'dropdown-link'
    },
    {
      title: 'Next Grammar',
      path: '/api/subcategories/2',
      cName: 'dropdown-link'
    },
  ];
  */
  //const isub_categories = [{id: '1', name: 'sub1'}, {id: "2", name: 'sub2'} ]
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {sub_categories.map((item, index) => {
            const ilink = '/subcategories/' + item.id
          return (
            
            <li key={index}>
              <Link
                className="dropdown-link"
                to= {ilink}
                onClick={() => {console.log("Dropdown.js on click item id = "+item.id); 
                      setClick(false)
                      setSubcatselected(item.id)
                    } 
                    }
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