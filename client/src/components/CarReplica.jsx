import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth/AuthContext.js';

export const CarReplica = (repli) => {

      const { token, user } = useContext(AuthContext);
      const decodedToken = token ? jwtDecode(token) : null;



  return (
        <li key={repli.id}>
            
        <section className={repli.repli.userId===decodedToken.id ? "usuarioactico":"otrousuario"}>
            <p><strong>Persona</strong> {repli.repli.userName}</p>
                <p><strong>Comentario:</strong> {repli.repli.reply}</p>
        </section>
        </li>
  )
}

 
