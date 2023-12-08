import React from "react";
import io from "socket.io-client"
import { useState, useEffect } from "react";
import InputText from "./InputText";

const socket = io.connect("http://localhost:5000");
export default function Socket() {
    
      //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    alert("send.rrrrrrrrrrr..")
    socket.emit("chat", { message: "my message"});
  };

  useEffect(() => {
    socket.on("chat_response", (data) => {
      console.log("receive chat response ",data)
      //setMessageReceived(data.message);
    });
  }, []);

  return (
    <div>
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}