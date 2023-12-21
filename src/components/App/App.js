import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { createBrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css'
import Login from '../Login/Login'
import Subcategory from '../Category/Subcategory';
import ChatContainer from './ChatContainer';
//import { ConfigProvider } from 'antd';
import axios from 'axios';
import QuizAttempt from './QuizAttempt';
import { useSelector, useDispatch} from "react-redux";
//const socket = io.connect("http://localhost:5000");
import { setRootPath } from '../../redux/rootpath';
import NavbarComponent from './NavbarComponent';
//import ImageComponent from './ImageComponent';
import Home from './Home';
//import Category from '../Category/Category';
import Logout from '../Login/Logout';


  export const Context = React.createContext()

  export default function App() {

  const token = useSelector((state) => state.token.value)
  const subcategory = useSelector((state) => state.subcategory.value)
  //const environment = useSelector((state) => state.environment.value)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const rootpath = useSelector((state) => state.rootpath.value)
  const uname = useSelector((state) => state.username.value)

  const dispatch = useDispatch()

  useEffect(() => {
  //console.log("BBBBBBBBBBBBBBBBBBBBBBBBB"+process.env.NODE_ENV)
  if (process.env.NODE_ENV === "development") {
      dispatch(setRootPath('http://localhost:5000'))
  }
  else if (process.env.NODE_ENV === "production") {
      dispatch(setRootPath('https://fullstack-kp-f6a689f4a15c.herokuapp.com'))
  }
  else {
    console.log("invalid NODE_ENV ")
  }
}, [dispatch]);

  //const navigate = useNavigate()
  useEffect(() => {
    //console.log("XXXXXXXXX"+rootpath)
    let url = `${rootpath}/api/categories`
    if (uname.length > 0 ) {
      axios.get(url).then((response) => {
        setCategories(response.data);
        let all_sub_categories = []
        response.data.forEach( category => {
          category.sub_categories.forEach( sub_cat => {
            all_sub_categories.push(sub_cat)
          })
        })
        setSubcategories(all_sub_categories)
      });
    }
  }, [uname, rootpath]);
 
    if(!token) {
        return <Login />
      }
      return (
        <>
          <BrowserRouter>
          <NavbarComponent categories={categories} />
          <h4 style={{textAlign:"center"}}>{subcategory}</h4>
            <Routes>
              <Route path="/" element = {<Home />} />
              <Route path="/logout" element = {<Logout />} />
              {
              subcategories.map(subcat => (
                <Route key={subcat.id} path={`/sub_categories/${subcat.id}/*`} element={<Subcategory id = {subcat.id} name={subcat.name}/>} />
              ))
              }
            <Route path="/quiz_attempts/take_quiz/:quiz_id" element = {<QuizAttempt username={uname} />} />
            </Routes>
            </BrowserRouter>
          
          
        </>
      )
   
  }