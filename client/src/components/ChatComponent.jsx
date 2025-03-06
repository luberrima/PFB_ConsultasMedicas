import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import {
    getChatMessagesService,
    sendChatMessageService,
} from '../services/fetchBackEnd.js';
import { CarReplica } from './carReplica.jsx';
// import { jwtDecode } from 'jwt-decode';
import './chatComponent.css';

export const ChatComponent = ({ consultationId, consultation }) => {
    const { token, user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    /* console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG',decodedToken); */

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
        <section className="chat-container">
            <h3>Chat de la consulta</h3>
            <ul>
                {consultation?.replies.map((repli) => (
                    <CarReplica key={repli.id} repli={repli} />
                ))}
            </ul>
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
                <button className="btn btn-azul" onClick={handleSendMessage}>
                    Enviar
                </button>
            </div>
        </section>
    );
};
