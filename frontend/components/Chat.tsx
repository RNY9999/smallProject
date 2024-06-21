'use client';
import axiosBase from 'axios';
import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Message {
    id: string;
    text: string;
}

const socket: Socket = io('http://localhost:5555');

const axios = axiosBase.create({
    baseURL: 'http://localhost:5555',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    responseType: 'json',
});

const Chat: React.FC = () => {
    event?.preventDefault();

    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log('Fetching data...');
                const response = await axios.get('/api/getAllMessages');
                console.log(response.data); // 期待値のデータをコンソールに表示
                setMessages(response.data); // レスポンスデータを状態にセット
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();

        // ソケットリスナーの設定
        socket.on('message', (msg: Message) => {
            console.log('get msg');
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // クリーンアップ関数でソケットリスナーを削除
        return () => {
            socket.off('message');
        };
    }, []); // 空の依存配列で初回レンダリング時のみ実行

    const sendMessage = () => {
        console.log(message);
        if (message) {
            const postData = {
                id: new Date().toISOString(),
                text: message
            };
            socket.emit('message', postData)
            const postMessage = async () => {
                try {
                    console.log('Posting data...');
                    await axios.post('/api/postMessage', postData);
                    console.log('sata posted');
                } catch(error) {
                    console.log('Error fetching messages:', error);
                }
            };
            postMessage();
        };
        
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
