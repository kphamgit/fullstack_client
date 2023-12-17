import React from 'react';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css'
import Login from '../Login/Login'
import Navbar from './Navbar';
//import Router from './routes/Router';
//import Home from '../Home/Home';
//import axios from 'axios';
import Subcategory from '../Category/Subcategory';
import ChatContainer from './ChatContainer';
import { faLadderWater } from '@fortawesome/free-solid-svg-icons';
//import Logout from '../Login/Logout'
//import { ConfigProvider } from 'antd';
import axios from 'axios';
import QuizAttempt from './QuizAttempt';
import { useSelector, useDispatch} from "react-redux";
//const socket = io.connect("http://localhost:5000");
import { setRootPath } from '../../redux/rootpath';


  export const Context = React.createContext()

  export default function App() {

  const token = useSelector((state) => state.token.value)
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
    console.log("invalide NODE_ENV ")
  }
}, [dispatch]);

  //const navigate = useNavigate()
  useEffect(() => {
    //console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"+rootpath)
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


console.log("in App.js local storage user"+localStorage.getItem('user'))
    //setLoggedinname(localStorage.getItem('user') )
    const user = localStorage.getItem('user')
    if(!token) {
        return <Login />
      }
  
    return (
      <>
        <BrowserRouter>
        <Navbar categories={categories}/>
          <Routes>
            <Route path="/" element = {<ChatContainer username={user} />} />
            {
  subcategories.map(id => (
    <Route key={id.id} path={`/subcategories/${id.id}`} element={<Subcategory id = {id.id} />} />
  ))
}

          <Route path="/quiz_attempts/take_quiz/:quiz_id" element = {<QuizAttempt username={user} />} />
          </Routes>
          </BrowserRouter>
        
        
      </>
    )
  }