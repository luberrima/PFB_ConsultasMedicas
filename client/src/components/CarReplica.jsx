import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const CarReplica = (repli) => {
    const { token /* , user */ } = useContext(AuthContext);
    const decodedToken = token ? jwtDecode(token) : null;

    return (
        console.log("esto es repli:", repli),
        <li key={repli.createdAt}>
            <section
                className={
                    repli.repli.userId === decodedToken.id
                        ? 'usuarioactivo'
                        : 'otrousuario'
                }
            >
                <p>
                    <strong></strong> {repli.repli.userName}
                </p>
                <p>
                    <strong></strong> {repli.repli.reply}
                </p>
            </section>
        </li>
    );
};
