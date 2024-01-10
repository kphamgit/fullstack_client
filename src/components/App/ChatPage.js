import React, { useContext } from 'react'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useEffect, useState } from 'react';
import styles from "./ChatPage.module.css";
import LiveScoreBoard from './LiveScoreBoard';
import { SocketContext } from './Home';


const ChatPage = () => {

  const socket = useContext(SocketContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
       socket.on('chat', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    /*
    useEffect(() => {
        // no-op if the socket is already connected
        console.log(" ChatPage connecting to server")
        socket.connect();
        return () => {
          socket.disconnect();
        };
    }, [socket]);
    */

    return (
      <div className= {styles.chat}>
        <div className={styles.chat__main}>
         
            <LiveScoreBoard className={styles.scoreboard}/>
           
          <ChatBody  messages={messages}  />
          <p></p>
          <ChatFooter socket={socket} />
        </div>
      </div>
    );
  };
  
  export default ChatPage;