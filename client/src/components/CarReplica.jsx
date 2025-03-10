import { jwtDecode } from "jwt-decode";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/auth/AuthContext.js";

export const CarReplica = ({ repli, userId, onDelete }) => {
    const { token } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;
    const isOwnMessage = repli.userId === userId;
    const [hover, setHover] = useState(false);

    return (
        <li
            key={repli.createdAt}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <section className={isOwnMessage ? "usuarioactivo" : "otrousuario"}>
                <p>
                    <strong>{repli.userName}:</strong> {repli.reply}
                </p>
                {isOwnMessage && hover && (
                    <button onClick={() => onDelete(repli.id)}>🗑</button>
                )}
            </section>
        </li>
    );
};