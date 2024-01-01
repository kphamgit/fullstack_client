import React from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useEffect, useState } from 'react';
import styles from "./ChatPage.module.css";


const ChatPage = ({ socket }) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
       socket.on('chat', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    /*
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
*/
    useEffect(() => {
        // no-op if the socket is already connected
        console.log(" ChatPage connecting to server")
        socket.connect();
        return () => {
          socket.disconnect();
        };
    }, [socket]);

    return (
      <div className= {styles.chat}>
        <div className={styles.chat__main}>
          <ChatBody  messages={messages}  />
          <p></p>
          <ChatFooter socket={socket} />
        </div>
      </div>
    );
  };
  
  export default ChatPage;