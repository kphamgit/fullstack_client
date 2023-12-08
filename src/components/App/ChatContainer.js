import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
//import UserLogin from './UserLogin';

export default function ChatContainer(props) {
    console.log("hererererere"+props.username)
    let socketio  = socketIOClient("http://localhost:5000")
    const [chats , setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    //const chatsRef = collection(db , "Messages")
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
        
         <div style={{display:'flex', flexDirection:"row", justifyContent: 'space-between'}} >
          <h4>Username: {props.username}</h4>
          <strong>Remember to Subscribe to  <a href='https://www.youtube.com/channel/UCmoQtgmJ2SHEAPCAR1Q8TBA'> My Channel</a></strong>
          <p style={{color:"blue", cursor:'pointer'}} >Log Out</p>
           </div>
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