import React from 'react';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect} from 'react';
import './App.css'
import Login from '../Login/Login'
import useToken from './useToken';
import Navbar from './Navbar';
//import Router from './routes/Router';
import Home from '../Home/Home';
//import axios from 'axios';
import Subcategory from '../Category/Subcategory';
import ChatContainer from './ChatContainer';
import { faLadderWater } from '@fortawesome/free-solid-svg-icons';
//import io from "socket.io-client";
//import Socket from './Socket'
import Logout from '../Login/Logout'
import { ConfigProvider } from 'antd';
import axios from 'axios';
//const socket = io.connect("http://localhost:5000");

  export const Context = React.createContext()

  export default function App() {

  const { token, setToken } = useToken();
  const [showchat, setShowchat] = useState(true);
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [loggedinname, setLoggedinname] = useState('')

  //const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((response) => {
      //alert(token)
      //setToken(response.data)
      setCategories(response.data);
      let all_sub_categories = []
      response.data.forEach( category => {
        category.sub_categories.forEach( sub_cat => {
          all_sub_categories.push(sub_cat)
        })
        
      })
      console.log("XXXXXX sub categories", all_sub_categories)
      setSubcategories(all_sub_categories)
      //subcategories.map(id => {
          //  console.log(id.id)
      //})
    });
  }, []);

  //Room State
  //const [room, setRoom] = useState("");

  // Messages States
  //const [message, setMessage] = useState("");
  //const [messageReceived, setMessageReceived] = useState("");

  //const joinRoom = () => {
   // if (room !== "") {
   //   socket.emit("join_room", room);
   // }
 // };

  //const sendMessage = () => {
   // socket.emit("chat", { message: "hello" });
 // };

  /*
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);
  */
 /*
    async function logout(credentials) {
      setToken("")
      fetch('http://localhost:5000/logout')
      navigate('/')
    }
  */
    function clearToken(chat){
        setToken('')
    }
    //const test = [7,4,5,6,8,9]
//alert(showchat)
    if(!token) {
        return <Login setToken={setToken} setLoggedInname = {setLoggedinname}/>
      }
  //console.log("in App.js showChat "+showchat)
    return (
      <>
        
        <Context.Provider value = { {token, setToken, showchat, setShowchat} }>
        <BrowserRouter>
        
        <Navbar categories={categories}/>
       
          <Routes>
            <Route path="/" element = {<ChatContainer username={loggedinname} />} />

            {
  subcategories.map(id => (
    <Route key={id.id} path={`/subcategories/${id.id}`} element={<Subcategory id = {id.id} />} />
  ))
}
          </Routes>
          </BrowserRouter>
          </Context.Provider>

        
      </>
    )
  }