import React from 'react';
import { BrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useState} from 'react';
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
//const socket = io.connect("http://localhost:5000");

  export const Context = React.createContext()

  export default function App() {

  const { token, setToken } = useToken();
  const [showchat, setShowchat] = useState(true);
  //const [subcatselected, setSubcatselected] = useState('')
  const [loggedinname, setLoggedinname] = useState('')

  //const navigate = useNavigate()

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
    const test = [1,7,4,5,6,8,9]
//alert(showchat)
    if(!token) {
        return <Login setToken={setToken} setLoggedInname = {setLoggedinname}/>
      }
  //console.log("in App.js showChat "+showchat)
    return (
      <>
        
        <Context.Provider value = { {token, setToken, showchat, setShowchat} }>
        <BrowserRouter>
        
        <Navbar />
       
          <Routes>
            <Route path="/" element = {<ChatContainer username={loggedinname} />} />

            {
  test.map(id => (
    <Route key={id} path={`/subcategories/${id}`} element={<Subcategory id = {id} />} />
  ))
}
          </Routes>
          </BrowserRouter>
          </Context.Provider>

        
      </>
    )
  }