'use client';
import React, { useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
    id: string;
    text: string;
}

const socket: Socket = io('http://localhost:5555');

const Chat: React.FC = () => {
    event?.preventDefault();

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    // useEffect(() => {
    //     console.log('use Effect');
    //     socket.on('message', (msg: Message) => {
    //         console.log(msg);
    //         setMessages((prevMessages) => [...prevMessages, msg]);
    //     });
    // });
    socket.on('message', (msg: Message) => {
        console.log(`new message\n${msg}`);
        setMessages([...messages, msg]);
    })

    const sendMessage = () => {
        console.log(message);
        if (message) {
            socket.emit('message', {id: new Date().toISOString(), text: message})
        }
        setMessage('');
    }

  return (
    <>
        <h1>Chat Room</h1>
        <div>
            {messages.map((msg) => {
                return <p key={msg.id}>{msg.text}</p>;
            })}
        </div>
        <form action="">
            <input
                type="text"
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
            />
            <button onClick={sendMessage}>SEND</button>
        </form>
    </>
  )
}

export default Chat
