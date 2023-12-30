import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import { useSelector } from 'react-redux';

export default function ChatContainer() {
  const rootpath = useSelector((state) => state.rootpath.value)
  const username = useSelector((state) => state.username.value)
    //console.log("hererererere username from props"+props.username)

    let socketio  = socketIOClient(rootpath)
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")
    const [chats , setChats] = useState([])
    //const [user, setUser] = useState(localStorage.getItem("user"))
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
          console.log(" in socket ON Chat")
            setChats(senderChats)
        })
    })

    function sendChatToSocket(chat){
        //alert("send...")
        console.log(" in sendChatToSocket username = ", username)
        socketio.emit("chat" , chat)
    }

    function addMessage(chat){
        console.log("AddMessage ENTRY. chat= ",chat)
        //is an javascript object: {message: "my message"}
        //use spread operator to add property "user" to chat object
        const newChat = {...chat , user: username}
        console.log("newChat = ", newChat)
        //newChat = {message: "my message", user: "kpham"}
        console.log("AddMessage BEFORE send chat to socket [...chats, newChat] = ",[...chats, newChat])
        setChats([...chats , newChat])
        console.log("AddMessage BEFORE send chat to socket . chats = ",chats)
        
        sendChatToSocket([...chats , newChat])
    }
   
    function ChatsList() {
      //console.log(" in chat list username = "+username)
        return( <div style={{ height:'25vh' , overflow:'scroll' , overflowX:'hidden' }}>
              {
                 chats.map((chat, index) => {
                  {console.log (" loop chat.use = "+chat.user)}
                  if(chat.user === username) return <ChatBoxSender  key={index} message={chat.message}  user={chat.user} />
                  return <ChatBoxReciever key={index} message={chat.message} user={username} />
              })
              }
               <div ref={messagesEndRef} />
        </div>)
       
    }

  return (
    <div>
        
       
         <div>
           <ChatsList
             />
           <InputText addMessage={addMessage} />
        </div>
        <div style={{margin:10 , display:'flex', justifyContent:'center'}} >
        <small style={{backgroundColor:'lightblue' , padding:5 , borderRadius:5}} >Interested in some 1 on 1 Coding Tutorials and Mentorship. Lets chat on Discord: <strong> kutlo_sek#5370 </strong></small>    
    </div>
     
    </div>
  )
}