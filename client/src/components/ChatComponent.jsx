import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import {
    getChatMessagesService,
    sendChatMessageService,
} from '../services/fetchBackEnd.js';

export const ChatComponent = ({ consultationId }) => {
    const { token, user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            if (!consultationId || !token) return;

            //esto falta por hacer el controller
            const response = await getChatMessagesService(
                consultationId,
                token
            );
            if (response.status === 'ok') {
                setMessages(response.data);
            }
        };
        fetchMessages();
    }, [consultationId, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        // HAY QUE MODIFICAR CREATE REPLY CONTROLLER PARA QUE SEA DE UNA CONSULTA ESPECIFICA
        const response = await sendChatMessageService(
            consultationId,
            newMessage,
            token
        );
        if (response.status === 'ok') {
            setMessages([...messages, response.data]);
            setNewMessage('');
        }
    };

    return (
        <div className="chat-container">
            <h3>Chat de la consulta</h3>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`chat-message ${
                            msg.userId === user.id ? 'own-message' : ''
                        }`}
                    >
                        <p>
                            <strong>{msg.username}:</strong> {msg.reply}
                        </p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button onClick={handleSendMessage}>Enviar</button>
            </div>
        </div>
    );
};
