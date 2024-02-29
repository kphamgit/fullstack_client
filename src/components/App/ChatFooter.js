import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./ChatPage.module.css";

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
    <div className={styles.chat__footer}>
      <form className="form" onSubmit={handleSendMessage}>
        <textarea
          type="text"
          placeholder="Write message"
          className={styles.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div><button className={styles.sendBtn}>Send</button></div>
      </form>
    </div>
  );
};

export default ChatFooter;