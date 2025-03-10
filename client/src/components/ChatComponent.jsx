import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext.js";
import {
    getChatMessagesService,
    sendChatMessageService,
    deleteChatMessageService
} from "../services/fetchBackEnd.js";
import { CarReplica } from "./CarReplica.jsx";
import { jwtDecode } from "jwt-decode";

export const ChatComponent = ({ consultationId }) => {
    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken?.id;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchMessages = async () => {
        if (!consultationId || !token) return;

        setLoading(true);
        const response = await getChatMessagesService(consultationId, token);
        if (response.status === "ok") {
            const sortedMessages = response.data.sort((a, b) =>
                new Date(a.createdAt) - new Date(b.createdAt)
            );
            setMessages(sortedMessages);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, [consultationId, token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const response = await sendChatMessageService(
            consultationId,
            newMessage,
            token
        );

        if (response?.status === "ok") {
            setNewMessage("");
            await fetchMessages();
        }
    };

    const handleDeleteMessage = async (messageId) => {
        const response = await deleteChatMessageService(messageId, token);
        if (response?.status === "ok") {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== messageId)
            );
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <section className="chat-container">
            <h3>Chat de la consulta</h3>
            <div className="chat-messages">
                {loading ? (
                    <p>Cargando mensajes...</p>
                ) : (
                    <ul>
                        {messages?.map((msg) => (
                            <CarReplica
                                key={msg.createdAt}
                                repli={msg}
                                userId={userId}
                                onDelete={handleDeleteMessage}
                            />
                        ))}
                    </ul>
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