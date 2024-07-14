// src/components/ChatWindow.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Register from './Register';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            setIsAuthenticated(true);
        }
    }, [token]);

    const sendMessage = async (message) => {
        const userMessage = { text: message, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        try {
            const response = await axios.post(
                'http://localhost:5000/chat',
                { message, conversation: messages.map(msg => ({ message: msg.text, type: msg.sender === 'user' ? 'USER' : 'ASSISTANT' })) },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            const aiMessage = { text: response.data.message[response.data.message.length - 1].message, sender: 'ai' };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
    };

    return (
        <div>
            {!isAuthenticated ? (
                <Register onLogin={handleLogin} />
            ) : (
                <>
                    <MessageList messages={messages} />
                    <MessageInput onSend={sendMessage} />
                </>
            )}
        </div>
    );
};

export default ChatWindow;

