import React from 'react';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css'
import Login from '../Login/Login'
import Navbar from './Navbar';
//import Router from './routes/Router';
import Home from '../Home/Home';
//import axios from 'axios';
import Subcategory from '../Category/Subcategory';
import ChatContainer from './ChatContainer';
import { faLadderWater } from '@fortawesome/free-solid-svg-icons';
//import Logout from '../Login/Logout'
//import { ConfigProvider } from 'antd';
import axios from 'axios';
import QuizAttempt from './QuizAttempt';
import { useSelector } from "react-redux";
//const socket = io.connect("http://localhost:5000");


  export const Context = React.createContext()

  export default function App() {

  const token = useSelector((state) => state.token.value)
  //const environment = useSelector((state) => state.environment.value)
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const uname = useSelector((state) => state.username.value)

  //const navigate = useNavigate()
  useEffect(() => {
    let url
    if (process.env.NODE_ENV === 'development') 
      url = 'http://localhost:5000/api/categories'
    else
      url = 'https://fullstack-kp-f6a689f4a15c.herokuapp.com/api/categories'
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
  }, [uname]);


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