import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');
  const username = useSelector((state) => state.username.value)

  const handleSendMessage = (e) => {
    
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat', {
        text: message,
        name: username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div><button className="sendBtn">Send</button></div>
      </form>
    </div>
  );
};

export default ChatFooter;