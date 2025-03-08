import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';
import {
    getChatMessagesService,
    sendChatMessageService,
} from '../services/fetchBackEnd.js';
import { CarReplica } from './carReplica.jsx';
import './chatComponent.css';

export const ChatComponent = ({ consultationId, consultation }) => {
    const { token, user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const fetchMessages = async () => {
        if (!consultationId || !token) return;

        setLoading(true);
        const response = await getChatMessagesService(consultationId, token);
        console.log("llega esto:", response)
            setMessages(response.data);

        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, [consultationId, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const response = await sendChatMessageService(consultationId, newMessage, token);
        if (response?.status === 'ok') {
            setNewMessage('');
            await fetchMessages();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <section className="chat-container">
            <h3>Chat de la consulta</h3>
            <ul>
                {consultation?.replies?.map((repli) => (
                    <CarReplica key={repli.createdAt} repli={repli} />
                ))}
            </ul>
            <div className="chat-messages">
                {loading ? (
                    <p>Cargando mensajes...</p>
                ) : (
                    messages?.map((msg) => (
                        <div
                            key={msg.createdAt}
                            className={`chat-message ${
                                msg.userId === user?.id ? 'own-message' : ''
                            }`}
                        >
                            <p>
                                <strong>{msg.username}:</strong> {msg.reply}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                />
                <button className="btn btn-azul" onClick={handleSendMessage}>
                    Enviar
                </button>
            </div>
        </section>
    );
};