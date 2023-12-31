import React from 'react'
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useSelector } from 'react-redux';
import InputText from './InputText';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';

/*
const socket = io.connect("http://localhost:5000", {
    autoConnect: false
  });
*/

function ChatHome({socket}) {

    const [chats , setChats] = useState([])
    const username = useSelector((state) => state.username.value)
    const [messageReceived, setMessageReceived] = useState("");
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    function addMessage(chat){
        //console.log("AddMessage ENTRY. message= ",message)
        //
        //=use spread operator to add property "user" to chat object
        const newChat = {...chat , user: username}
        //console.log("b4 setChats newChat = ", newChat)
        //use spread operator to add newChat to chats array in useState
        setChats([...chats , newChat])
        //socket.emit("chat", newChat);  //emit the new chat message
        socket.emit("chat", [...chats , newChat]);
    }
    useEffect(() => {
        // no-op if the socket is already connected
        socket.connect();
      
        return () => {
          socket.disconnect();
        };
    }, []);

        // Messages States
 
    const sendMessage = () => {
            //socket.emit("chat", { message });
    };

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(() => {
      socket.on('chat', senderChats => {
        console.log(" in socket ON Chat senderChats =",senderChats)
          setChats(senderChats)
          //setChats([...chats , senderChats])
      })
        return () => {
            //event registration cleanup
            console.log("cleaned up event")
            socket.off("chat")
          };
    }, []);

    
    function ChatsList() {
      //console.log(" in chat list username = "+username)
        return( <div style={{ height:'35vh' , overflow:'scroll' , overflowX:'hidden' }}>
              {
                 chats.map((chat, index) => {
                  {console.log (" loop chat message = "+chat.message)}
                  if(chat.user === username) return <ChatBoxSender  key={index} message={chat.message}  user={chat.user} />
                  return <ChatBoxReciever key={index} message={chat.message} user={chat.user} />
              })
              }
               <div ref={messagesEndRef} />
        </div>)
    }

  return (
    <>
      <ChatsList />
      <InputText addMessage={addMessage} />
    </>
  );
}

export default ChatHome