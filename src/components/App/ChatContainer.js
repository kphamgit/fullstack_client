import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import { useSelector } from 'react-redux';

export default function ChatContainer(props) {
  const rootpath = useSelector((state) => state.rootpath.value)
    //console.log("hererererere username from props"+props.username)
    let socketio  = socketIOClient(rootpath)
    const [chats , setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })

    function sendChatToSocket(chat){
        //alert("send...")
        console.log(" username = ",props.username)
        socketio.emit("chat" , chat)
    }

    
    function addMessage(chat){
        console.log("LAST chat= ",chat)
        //use spread operator to add property "user" to chat object
        const newChat = {...chat , user:"basic"}
        console.log("newChat = ", newChat)
        setChats([...chats , newChat])
        sendChatToSocket([...chats , newChat])
    }
   
    function ChatsList(){
      console.log(" in chat list user = "+user)
        return( <div style={{ height:'25vh' , overflow:'scroll' , overflowX:'hidden' }}>
              {
                 chats.map((chat, index) => {
                  if(chat.user === user) return <ChatBoxSender  key={index} message={chat.message}  user={chat.user} />
                  return <ChatBoxReciever key={index} message={chat.message} user={props.username} />
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